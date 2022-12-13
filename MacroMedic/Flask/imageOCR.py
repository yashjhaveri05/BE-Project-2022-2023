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
                vals.append("low")
                vals.append(1)
            elif float(observed) > adj_max:
                vals.append("high")
                vals.append(1)
            elif float(observed) < adj_max and float(observed) > max_limit:
                vals.append("high")
                vals.append(0)
            elif float(observed) > adj_min and float(observed) < min_limit:
                vals.append("low")
                vals.append(0)
        if vals != []:
            anomalies[parameter] = vals
    return anomalies

# def getPriorityValue(word, priority_list):
#   for key in priority_list:
#     if word == key:
#       return priority_list.get(key).get('priority')
#   for i in priority_list.keys():
#     if type(priority_list.get(i)) == list:
#       sub_list = priority_list.get(i)[0]
#       for key in sub_list:
#         if word == key:
#           return sub_list.get(key).get('priority')
#   return 6

# def getPriority(output, priority_list):
#   key_dict = list(output.keys())
#   final_list = []
#   final_priority = 5
#   for i in key_dict:
#     val = getPriorityValue(i, priority_list)
#     print(final_list)
#     if val < final_priority:
#       final_priority = val
#       final_list.clear()
#       final_list.append(i)
#     elif val == final_priority:
#       final_list.append(i)
#   return final_list

# def getAnalysis(result_list, output, report_list):
#   for i in result_list:
#     rep_list = report_list.get(i)
#     if rep_list == None:
#       for j in report_list.keys():
#         if type(report_list.get(j)) == list:
#           sub_list = report_list.get(j)[0]
#           for key in sub_list:
#             if i == key:
#               rep_list = sub_list.get(key)
#     print(rep_list)
#     output_value = output.get(i)
#     output_list = rep_list.get(output_value[0])
#     output_remedy = rep_list.get("remedy_" + output_value[0])
#     if output_value[1] == 1:
#       print("you need to visit a " + output_list[1])
#     if output_list[0]:
#       print(output_list[0])
#     print("Remedy: ", output_remedy)

def getAnalysis(output, report_list, priority_list):
  result_list = list(output.keys())
  final_dict = {}
  high_priority_dict = {}
  high_pri = 6
  for i in result_list:
    rep_list = report_list.get(i)
    if rep_list != None:
      priority = priority_list.get(i)
      rep_list['priority'] = priority['priority']
      final_dict[i] = rep_list
      if priority['priority'] < high_pri:
        high_pri = priority['priority']
        high_priority_dict.clear()
        high_priority_dict[i] = rep_list
      elif priority['priority'] == high_pri:
        high_priority_dict[i] = rep_list
  print("Final list of all: ", final_dict)
  print("Highest priority: ", high_priority_dict)

def main(file_name):
    table_csv = get_table_csv_results(file_name)
    anomalies = analysis(table_csv)
    print(anomalies)
    #Sample Output:
    output = {'Eosinophils ': ['high', 1], 'MPV (Mean Platelet Volume) ': ['high', 0]}

    f = open('../../Report Analysis/analysis.json')
    report_list = json.load(f)
    print(report_list)
    f.close()
    g = open('../../Report Analysis/priority.json')
    priority_list = json.load(g)
    print(priority_list)
    g.close()

    # result_list = getPriority(output, priority_list)
    # getAnalysis(result_list, output, report_list)

    getAnalysis(output, report_list, priority_list)

if __name__ == "__main__":
    file_name = sys.argv[1]
    main(file_name)