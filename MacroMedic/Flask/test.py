import pypdfium2 as pdfium

# Load a document
filepath = "report1.pdf"
# pdf = pdfium.PdfDocument(filepath)
file_name = filepath.replace(".", "_")
output_path = file_name + "_pg" + "1" + ".jpg"
print(output_path)

# # render a single page (in this case: the first one)
# page = pdf.get_page(0)
# pil_image = page.render_to(
#     pdfium.BitmapConv.pil_image,
# )
# pil_image.save("output.jpg")

# render multiple pages concurrently (in this case: all)
# page_indices = [i for i in range(len(pdf))]
# renderer = pdf.render_to(
#     pdfium.BitmapConv.pil_image,
#     page_indices = page_indices,
# )
# for image, index in zip(renderer, page_indices):
#     image.save("output_%02d.jpg" % index)
# for i in range(len(pdf)):
#     page = pdf.get_page(i)
#     pil_image = page.render_to(
#         pdfium.BitmapConv.pil_image,
#     )
#     pil_image.save("output" + str(i) + ".jpg")