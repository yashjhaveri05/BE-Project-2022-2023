# # #pip install PyMuPDF


# # import glob, sys, fitz

# # # To get better resolution
# # zoom_x = 2.0  # horizontal zoom
# # zoom_y = 2.0  # vertical zoom
# # mat = fitz.Matrix(zoom_x, zoom_y)  # zoom factor 2 in each dimension

# # path = '../data/in/'
# # all_files = glob.glob(path + "*.pdf")

# # for filename in all_files:
# #     doc = fitz.open(filename)  # open document
# #     for page in doc:  # iterate through the pages
# #         pix = page.get_pixmap(matrix=mat)  # render page to an image
# #         pix.save("../data/out/page-%i.png" % page.number)
# from pdf2jpg import pdf2jpg

# inputpath = r"report1.pdf"
# outputpath = r""
# result = pdf2jpg.convert_pdf2jpg(inputpath,outputpath, pages="ALL")