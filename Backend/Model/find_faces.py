from .mtcnn import MTCNN, extract_face
from PIL import Image, ImageDraw


def detect_face(img):
    mtcnn = MTCNN(keep_all=True, device='cpu')

    boxes, probs, points = mtcnn.detect(img, landmarks=True)

    img_draw = img.copy()
    draw = ImageDraw.Draw(img_draw)

    for i, (box, point) in enumerate(zip(boxes, points)):
        draw.rectangle(box.tolist(), width=5)
        for p in point:
            draw.rectangle((p - 10).tolist() + (p + 10).tolist(), width=10)
        # extract_face(img, box, save_path='detected_face_{}.png'.format(i))
    # img_draw.save('annotated_faces.png')
    return img_draw


def to_bytes(yourimagefile):
     with open(yourimagefile, "rb") as image_file:
         base64string = base64.b64encode(image_file.read())
         return base64string

