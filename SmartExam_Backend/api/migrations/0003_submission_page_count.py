# Generated migration

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='submission',
            name='page_count',
            field=models.IntegerField(default=0, help_text='Number of pages in submission'),
        ),
    ]
