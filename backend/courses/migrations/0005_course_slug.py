# Generated by Django 5.0.6 on 2024-05-19 22:35

# 0005_course_slug.py

from django.db import migrations, models
import django.utils.text

def generate_unique_slugs(apps, schema_editor):
    Course = apps.get_model('courses', 'Course')
    for course in Course.objects.all():
        if not course.slug:
            course.slug = django.utils.text.slugify(course.name)
            course.save()

class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_usercourse'),  
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='slug',
            field=models.SlugField(max_length=60, blank=True),  # Унікальне обмеження тимчасово знято
        ),
        migrations.RunPython(generate_unique_slugs, reverse_code=migrations.RunPython.noop),
    ]
