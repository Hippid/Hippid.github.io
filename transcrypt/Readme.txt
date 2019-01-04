Create a new environment

[Format]
conda create --name <environment name> python=3.7 <conda packages>
[Example]
conda create --name transcrypt python=3.7 pip
conda create --name scrapy python=3.7 pip

Note: Multiple packages can be directly installed
[Example]
conda create --name project1 python=3.7 pip numpy


Activate environment

[Format]
activate <environment name>
[Example]
activate transcrypt


Install non conda packages
Note: To install in specific environment, Use "activate <environment name>" first.

[Format]
pip install <package name>
[Example]
pip install transcrypt


[Create yml file]
conda activate transcrypt
conda env export > environment.yml

[Import yml file]
conda env create -f environment.yml


# For Windows users# Note: <> denotes changes to be made

#Create a conda environment
conda create --name <environment-name> python=<version:2.7/3.5>

#To create a requirements.txt file:

#Gives you list of packages used for the environment
conda list 

#Save all the info about packages to your folder
conda list -e > requirements.txt
# Note: Reaplce first '=' with '==', If there is a second '=' on the same line remove it.
# Append pip packages.
# Note: Will contain doubles
pip freeze >> requirements.txt

# Write full requirements.txt
pip freeze --all > requirements.txt

#To export environment file
activate <environment-name>
conda env export > <environment-name>.yml

#For other person to use the environment
conda env create -f <environment-name>.yml
