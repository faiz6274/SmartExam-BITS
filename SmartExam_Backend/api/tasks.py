# Simple synchronous helper to convert images to PDF using img2pdf
from .models import SubmissionFile
import img2pdf
from django.core.files.base import ContentFile
from django.conf import settings
import os
from tempfile import NamedTemporaryFile

def convert_submission_images_to_pdf(submission):
    files = submission.files.all().order_by('page_number')
    paths = []
    for f in files:
        # if using local storage, get path; for S3 you'd download temporarily
        if hasattr(f.file, 'path'):
            paths.append(f.file.path)
        else:
            # Not implemented: handle remote S3 download
            pass
    if not paths:
        return None
    output = NamedTemporaryFile(delete=False, suffix='.pdf')
    with open(output.name, 'wb') as out_f:
        out_f.write(img2pdf.convert(paths))
    # Save back to SubmissionFile or Submission as needed
    return output.name
