#!/bin/bash

. ./openrc.sh; ansible-playbook -i hosts --ask-become-pass run-crawler-cloud.yaml 

# . ./openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/test.pem run_crawler_cloud.yaml