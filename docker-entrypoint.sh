#!/bin/sh

envsubst '$PORT' < /etc/nginx/conf.d/jhist.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
