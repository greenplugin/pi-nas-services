#
# Dockerfile for pptpd
#
FROM alpine

RUN apk add --no-cache iptables ppp pptpd bcrelay

EXPOSE 1723

CMD set -xe \
    && echo 1 > /proc/sys/net/ipv4/ip_forward \
    && pptpd \
    && syslogd -n -O /dev/stdout
