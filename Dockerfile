FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*

ENV PORT 80

CMD envsubst '$PORT' < /etc/nginx/conf.d/jhist.conf.template > /etc/nginx/conf.d/jhist.conf && nginx -g 'daemon off;'

COPY jhist.conf.template /etc/nginx/conf.d

COPY dist /usr/share/nginx/html
