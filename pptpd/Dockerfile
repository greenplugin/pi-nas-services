#
# Dockerfile for pptpd
#
FROM alpine

RUN apk add --no-cache iptables ppp pptpd

EXPOSE 1723

CMD set -xe \
    && iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE \
    && pptpd \
    && syslogd -n -O /dev/stdout
