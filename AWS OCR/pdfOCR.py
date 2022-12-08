# import glob, sys, fitz
# import webbrowser, os
# import json
# import boto3
# import io
# from io import BytesIO
# import sys
# from pprint import pprint
# from dotenv import load_dotenv

# load_dotenv()

# AWSSecretKey = os.getenv('AWSSecretKey')
# AWSAccessKeyId = os.getenv('AWSAccessKeyId')


# def get_rows_columns_map(table_result, blocks_map):
#     rows = {}
#     for relationship in table_result['Relationships']:
#         if relationship['Type'] == 'CHILD':
#             for child_id in relationship['Ids']:
#                 cell = blocks_map[child_id]
#                 if cell['BlockType'] == 'CELL':
#                     row_index = cell['RowIndex']
#                     col_index = cell['ColumnIndex']
#                     if row_index not in rows:
#                         # create new row
#                         rows[row_index] = {}
                        
#                     # get the text value
#                     rows[row_index][col_index] = get_text(cell, blocks_map)
#     return rows


# def get_text(result, blocks_map):
#     text = ''
#     if 'Relationships' in result:
#         for relationship in result['Relationships']:
#             if relationship['Type'] == 'CHILD':
#                 for child_id in relationship['Ids']:
#                     word = blocks_map[child_id]
#                     if word['BlockType'] == 'WORD':
#                         text += word['Text'] + ' '
#                     if word['BlockType'] == 'SELECTION_ELEMENT':
#                         if word['SelectionStatus'] =='SELECTED':
#                             text +=  'X '    
#     return text


# def get_table_csv_results(file_name):

#     with open(file_name, 'rb') as file:
#         img_test = file.read()
#         bytes_test = bytearray(img_test)
#         print('Image loaded', file_name)

#     # process using image bytes
#     # get the results
#     client = boto3.client('textract', aws_access_key_id = AWSAccessKeyId,
#             aws_secret_access_key = AWSSecretKey, 
#             region_name = 'ap-south-1')

#     response = client.analyze_document(Document={'Bytes': bytes_test}, FeatureTypes=['TABLES'])

#     # Get the text blocks
#     blocks=response['Blocks']

#     blocks_map = {}
#     table_blocks = []
#     for block in blocks:
#         blocks_map[block['Id']] = block
#         if block['BlockType'] == "TABLE":
#             table_blocks.append(block)

#     if len(table_blocks) <= 0:
#         return "<b> NO Table FOUND </b>"

#     csv = ''
#     for index, table in enumerate(table_blocks):
#         csv += generate_table_csv(table, blocks_map, index +1)
#         csv += '\n\n'

#     return csv

# def generate_table_csv(table_result, blocks_map, table_index):
#     rows = get_rows_columns_map(table_result, blocks_map)

#     table_id = 'Table_' + str(table_index)
    
#     # get cells.
#     csv = 'Table: {0}\n\n'.format(table_id)

#     for row_index, cols in rows.items():
        
#         for col_index, text in cols.items():
#             csv += '{}'.format(text) + ","
#         csv += '\n'
        
#     csv += '\n\n\n'
#     return csv

# def main():
#     zoom_x = 2.0  # horizontal zoom
#     zoom_y = 2.0  # vertical zoom
#     mat = fitz.Matrix(zoom_x, zoom_y)  # zoom factor 2 in each dimension

#     all_files = glob.glob("report1.pdf")

#     for filename in all_files:
#         doc = fitz.open(filename)  # open document
#         for page in doc:  # iterate through the pages
#             pix = page.get_pixmap(matrix=mat)
#             pix.save("page-%i.png" % page.number)  # render page to an image
#             table_csv = get_table_csv_results("page-%i.png" % page.number)
#             output_file = 'output' + str(page.number) + ".csv"
#             with open(output_file, "wt") as fout:
#                 fout.write(table_csv)
#             print('CSV OUTPUT FILE: ', output_file)

# main()
