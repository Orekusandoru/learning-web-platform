from django.db import models

class Course(models.Model):
    name = models.CharField(max_length = 60 , null = False)
    slug = models.SlugField(max_length=60, unique=True, blank=True)
    description = models.CharField(max_length = 250 , null = True)
    active = models.BooleanField(default = False)
    thumbnail = models.ImageField(upload_to = "files/thumbnail") 
    date = models.DateTimeField(auto_now_add= True) 
    resource = models.FileField(upload_to = "files/resource")
    length = models.IntegerField(null=False)
    
    def __str__(self):
        return self.name


class CourseProperty(models.Model):
    description  = models.CharField(max_length = 100 , null = False)
    course = models.ForeignKey(Course , null = False , on_delete=models.CASCADE)

    class Meta : 
        abstract = True


class Tag(CourseProperty):
    pass
    
class Prerequisite(CourseProperty):
    pass

class Learning(CourseProperty):
    pass