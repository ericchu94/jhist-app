FROM nginx:alpine

ENV PORT 80

COPY jhist.conf.template /etc/nginx/conf.d

COPY dist /usr/share/nginx/html

COPY docker-entrypoint.sh /

CMD ["/docker-entrypoint.sh"]
