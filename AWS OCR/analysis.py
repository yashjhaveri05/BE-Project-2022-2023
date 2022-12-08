import pandas as pd
import numpy as np

report = pd.read_csv('output.csv')
report = report.fillna(-1)
columns = report.columns
anomalies = {}

file1 = open("output.txt","a")

for i in range(len(report)):
    parameter = report.loc[i, columns[0]]
    observed = report.loc[i, columns[1]]
    limits = report.loc[i, columns[3]]
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

print(anomalies)