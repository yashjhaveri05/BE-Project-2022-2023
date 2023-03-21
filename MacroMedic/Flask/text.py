# from transformers import GPT2Tokenizer, TFGPT2Model

# tokenizer = GPT2Tokenizer.from_pretrained('gpt2-large')
# model = TFGPT2Model.from_pretrained('gpt2-large')
# text = "'eosinophils': {'information': 'Are a part of WBC, help fight allergies', 'high': ['allergy', 'physician'], 'low': ['allergy', 'physician'], 'remedy_high': ['avoid spicy foods', 'avoid aerated drinks'], 'remedy_low': ['consume more diary products']"
# encoded_input = tokenizer(text, return_tensors='tf')
# output = model(encoded_input)
# print(output)

# from keytotext import pipeline

# nlp = pipeline("k2t-base")  #loading the pre-trained model
# params = {"do_sample":True, "num_beams":4, "no_repeat_ngram_size":3, "early_stopping":True}    #decoding params
# print (nlp(['Delhi', 'India', 'capital'], **params))

# import os
# import json

# f = open('../../Report Analysis/analysis.json')
# report_list = json.load(f)
# print()
# print(report_list['glucose_fasting']['information'] + " Since the observed glucose fasting level is high, there are " + report_list['glucose_fasting']['high'][0] + " and it is preferable to show a " + report_list['glucose_fasting']['high'][1]  + ".")
# print("It is recommended to consume " + report_list['glucose_fasting']['remedy_high'][0] + "," + report_list['glucose_fasting']['remedy_high'][1] + "," + report_list['glucose_fasting']['remedy_high'][2] + " and " + report_list['glucose_fasting']['remedy_high'][3] + ".")
# print()
# output = {'Eosinophils': ['high', 1], 'MPV (Mean Platelet Volume)': ['high', 0], 'Vitamin B12 level (Serum,CMIA)': ['low', 0]}

# def getStart(output):
#     start = "From the report, it is observed that "
#     i = 0
#     for k,v in output.items():
#         start += str(k)
#         start += " is "
#         start += str(v[0])
#         if i == len(output) - 2:
#             start += " and "
#         elif i == len(output) - 1:
#             start += "."
#         else:
#             start += ", "
#         i+=1
#     return start

# print(getStart(output))
from pdf2image import convert_from_path
pages = convert_from_path('TANAY.pdf', 500, poppler_path="sr\locain")
for page in pages:
    page.save('out.jpg', 'JPEG')