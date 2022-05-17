#!/bin/bash

. ./openrc.sh; ansible-playbook --ask-become-pass run-nectar.yaml
