import pandas as pd

rows = {
    1: {1: 'Investigation ', 2: 'Observed Value ', 3: 'Unit ', 4: 'Biological Reference Interva '}, 
    2: {1: 'Erythrocytes ', 2: '', 3: '', 4: ''}, 
    3: {1: 'Haemoglobin (Hb) ', 2: '13.6 ', 3: 'gm/dL ', 4: '12.5-16.5 '}, 
    4: {1: 'Erythrocyte (RBC) Count ', 2: '5.15 ', 3: 'mill/cu.mm ', 4: '4.2-5.6 '}, 
    5: {1: 'PCV (Packed Cell Volume) ', 2: '40.9 ', 3: '% ', 4: '36-47 '}, 
    6: {1: 'MCV (Mean Corpuscular Volume) ', 2: '79.4 ', 3: 'fL ', 4: '78-95 '}, 
    7: {1: 'MCH (Mean Corpuscular Hb) ', 2: '26.4 ', 3: 'pg ', 4: '26-32 '}, 
    8: {1: 'MCHC (Mean Corpuscular Hb Concn.) ', 2: '33.3 ', 3: 'g/dL ', 4: '32-36 '}, 
    9: {1: 'RDW (Red Cell Distribution Width) ', 2: '12.8 ', 3: '% ', 4: '11.5-14.0 '}, 
    10: {1: 'Leucocytes ', 2: '', 3: '', 4: ''}, 
    11: {1: 'Total Leucocytes (WBC) count ', 2: '5,700 ', 3: 'cells/cu.mm ', 4: '4000-10500 '}, 
    12: {1: 'Absolute Neutrophils Count ', 2: '2622 ', 3: '/c.mm ', 4: '2000-7000 '}, 
    13: {1: 'Absolute Lymphocyte Count ', 2: '2280 ', 3: '/c.mm ', 4: '1000-3000 '}, 
    14: {1: 'Absolute Monocyte Count ', 2: '285 ', 3: '/c.mm ', 4: '200-1000 '}, 
    15: {1: 'Absolute Eosinophil Count ', 2: '456 ', 3: '/c.mm ', 4: '20-500 '}, 
    16: {1: 'Absolute Basophil Count ', 2: '57 ', 3: '/c.mm ', 4: '20-100 '}, 
    17: {1: 'Neutrophils ', 2: '46 ', 3: '% ', 4: '44-76 '}, 
    18: {1: 'Lymphocytes ', 2: '40 ', 3: '% ', 4: '15-43 '}, 
    19: {1: 'Monocytes ', 2: '5 ', 3: '% ', 4: '4.0-9.0 '}, 
    20: {1: 'Eosinophils ', 2: '8 ', 3: '% ', 4: '0-6 '}, 
    21: {1: 'Basophils ', 2: '1 ', 3: '% ', 4: '0-2 '}, 
    22: {1: 'Platelets ', 2: '', 3: '', 4: ''}, 
    23: {1: 'Platelet count ', 2: '245 ', 3: '10^3 / pl ', 4: '150-450 '}, 
    24: {1: 'MPV (Mean Platelet Volume) ', 2: '9.9 ', 3: 'fL ', 4: '6-9.5 '}, 
    25: {1: 'PCT ( Platelet Haematocrit) ', 2: '0.24 ', 3: '% ', 4: '0.2-0.5 '}, 
    26: {1: 'PDW (Platelet Distribution Width) ', 2: '11.5 ', 3: '% ', 4: '9-17 '}
}

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
x = analysis(df)
print(x)