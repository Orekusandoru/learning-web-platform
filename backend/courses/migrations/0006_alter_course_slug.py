# 0006_auto__add_unique_course_slug.py

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_course_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='slug',
            field=models.SlugField(max_length=60, unique=True),
        ),
    ]
