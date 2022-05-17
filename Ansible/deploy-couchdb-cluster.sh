#!/bin/bash

. ./openrc.sh; ansible-playbook -i hosts --ask-become-pass deploy-couchdb-cluster.yaml

