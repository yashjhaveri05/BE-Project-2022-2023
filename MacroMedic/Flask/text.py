from transformers import GPT2Tokenizer, TFGPT2Model

tokenizer = GPT2Tokenizer.from_pretrained('gpt2-large')
model = TFGPT2Model.from_pretrained('gpt2-large')
text = "'eosinophils': {'information': 'Are a part of WBC, help fight allergies', 'high': ['allergy', 'physician'], 'low': ['allergy', 'physician'], 'remedy_high': ['avoid spicy foods', 'avoid aerated drinks'], 'remedy_low': ['consume more diary products']"
encoded_input = tokenizer(text, return_tensors='tf')
output = model(encoded_input)
print(output)