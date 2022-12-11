import pandas as pd
import numpy as np
import json

# report = pd.read_csv('output.csv')
# report = report.fillna(-1)
# columns = report.columns
# anomalies = {}

# file1 = open("output.txt","a")

# for i in range(len(report)):
#     parameter = report.loc[i, columns[0]]
#     observed = report.loc[i, columns[1]]
#     limits = report.loc[i, columns[3]]
#     vals = []
#     if int(observed) == -1 and int(limits) == -1:
#         pass
#     else:
#         limits = limits.split("-")
#         max_limit = float(limits[1])
#         min_limit = float(limits[0])
#         adj_max = float(max_limit/0.9)
#         adj_min = float(((min_limit/adj_max) - 0.1)*adj_max)
#         if float(observed) < adj_min:
#             vals.append("Low")
#             vals.append(1)
#         elif float(observed) > adj_max:
#             vals.append("High")
#             vals.append(1)
#         elif float(observed) < adj_max and float(observed) > max_limit:
#             vals.append("High")
#             vals.append(0)
#         elif float(observed) > adj_min and float(observed) < min_limit:
#             vals.append("Low")
#             vals.append(0)
#     if vals != []:
#         anomalies[parameter] = vals

# print(anomalies)

f = open('../Report Analysis/analysis.json')
report_list = json.load(f)
f.close()
g = open('../Report Analysis/priority.json')
priority_list = json.load(g)
g.close()

output = {'eosinophils': ['high', 1], 'MPV (Mean Platelet Volume)': ['high', 0]}
output = dict((k.lower(), v) for k, v in output.items()) 

def getPriorityValue(word):
  for key in priority_list:
    if word == key:
      return priority_list.get(key).get('priority')
  for i in priority_list.keys():
    if type(priority_list.get(i)) == list:
      sub_list = priority_list.get(i)[0]
      for key in sub_list:
        if word == key:
          return sub_list.get(key).get('priority')
  return 6

def getPriority(output):
  key_dict = list(output.keys())
  final_list = []
  final_priority = 5
  for i in key_dict:
    val = getPriorityValue(i)
    print(final_list)
    if val < final_priority:
      final_priority = val
      final_list.clear()
      final_list.append(i)
    elif val == final_priority:
      final_list.append(i)
  return final_list

def getAnalysis(result_list, output):
  for i in result_list:
    rep_list = report_list.get(i)
    if rep_list == None:
      for j in report_list.keys():
        if type(report_list.get(j)) == list:
          sub_list = report_list.get(j)[0]
          for key in sub_list:
            if i == key:
              rep_list = sub_list.get(key)
    print(rep_list)
    output_value = output.get(i)
    output_list = rep_list.get(output_value[0])
    output_remedy = rep_list.get("remedy_" + output_value[0])
    if output_value[1] == 1:
      print("you need to visit a " + output_list[1])
    if output_list[0]:
      print(output_list[0])
    print("Remedy: ", output_remedy)

result_list = getPriority(output)
getAnalysis(result_list, output)