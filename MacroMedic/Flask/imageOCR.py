import webbrowser, os
import json
import boto3
import io
from io import BytesIO
import sys
from pprint import pprint
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

AWSSecretKey = os.getenv('AWSSecretKey')
AWSAccessKeyId = os.getenv('AWSAccessKeyId')

def get_rows_columns_map(table_result, blocks_map):
    rows = {}
    for relationship in table_result['Relationships']:
        if relationship['Type'] == 'CHILD':
            for child_id in relationship['Ids']:
                cell = blocks_map[child_id]
                if cell['BlockType'] == 'CELL':
                    row_index = cell['RowIndex']
                    col_index = cell['ColumnIndex']
                    if row_index not in rows:
                        # create new row
                        rows[row_index] = {}
                        
                    # get the text value
                    rows[row_index][col_index] = get_text(cell, blocks_map)
    return rows


def get_text(result, blocks_map):
    text = ''
    if 'Relationships' in result:
        for relationship in result['Relationships']:
            if relationship['Type'] == 'CHILD':
                for child_id in relationship['Ids']:
                    word = blocks_map[child_id]
                    if word['BlockType'] == 'WORD':
                        text += word['Text'] + ' '
                    if word['BlockType'] == 'SELECTION_ELEMENT':
                        if word['SelectionStatus'] =='SELECTED':
                            text +=  'X '    
    return text


def get_table_csv_results(file_name):

    with open(file_name, 'rb') as file:
        img_test = file.read()
        bytes_test = bytearray(img_test)

    # process using image bytes
    # get the results
    client = boto3.client('textract', aws_access_key_id = AWSAccessKeyId,
            aws_secret_access_key = AWSSecretKey, 
            region_name = 'ap-south-1')

    response = client.analyze_document(Document={'Bytes': bytes_test}, FeatureTypes=['TABLES'])

    # Get the text blocks
    blocks=response['Blocks']

    blocks_map = {}
    table_blocks = []
    for block in blocks:
        blocks_map[block['Id']] = block
        if block['BlockType'] == "TABLE":
            table_blocks.append(block)

    if len(table_blocks) <= 0:
        return "<b> NO Table FOUND </b>"

    csv = ''
    for index, table in enumerate(table_blocks):
        csv = generate_table_csv(table, blocks_map, index +1)

    return csv

def generate_table_csv(table_result, blocks_map, table_index):
    rows = get_rows_columns_map(table_result, blocks_map)

    columns = []
    entity = []
    obs = []
    unit = []
    interval = []

    for row_index, cols in rows.items():
        if row_index == 1:
            for col_index, text in cols.items():
                columns.append(text.strip())
        else:
            entity.append(cols[1].strip())
            if cols[2] == '':
                obs.append(-1)
            else:
                cols[2] = cols[2].replace(',', '')
                obs.append(float(cols[2]))
            unit.append(cols[3].strip())
            if cols[4] == '':
                interval.append(-1)
            else:
                interval.append(cols[4].strip())

    data = {
        columns[0] : entity,
        columns[1] : obs,
        columns[2] : unit,
        columns[3] : interval
    }

    df = pd.DataFrame(data)
    return df

def analysis(df):
    anomalies = {}
    columns = df.columns
    for i in range(len(df)):
        parameter = df.loc[i, columns[0]]
        observed = df.loc[i, columns[1]]
        limits = df.loc[i, columns[3]]
        vals = []
        if int(observed) == -1 and int(limits) == -1:
            pass
        else:
            limits = limits.split("-")
            max_limit = float(limits[1])
            min_limit = float(limits[0])
            adj_max = float(max_limit/0.9)
            adj_min = float(((min_limit/adj_max) - 0.1)*adj_max)
            if float(observed) < adj_min:
                vals.append("Low")
                vals.append(1)
            elif float(observed) > adj_max:
                vals.append("High")
                vals.append(1)
            elif float(observed) < adj_max and float(observed) > max_limit:
                vals.append("High")
                vals.append(0)
            elif float(observed) > adj_min and float(observed) < min_limit:
                vals.append("Low")
                vals.append(0)
        if vals != []:
            anomalies[parameter] = vals
    return anomalies

def main(file_name):
    table_csv = get_table_csv_results(file_name)
    anomalies = analysis(table_csv)
    print(anomalies)
    #Sample Output:
    # {'Eosinophils ': ['High', 1], 'MPV (Mean Platelet Volume) ': ['High', 0]}

if __name__ == "__main__":
    file_name = sys.argv[1]
    main(file_name)