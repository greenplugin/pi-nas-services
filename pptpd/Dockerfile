#
# Dockerfile for pptpd
#
FROM alpine

RUN apk add --no-cache iptables ppp pptpd

CMD set -xe \
    && iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE \
    && echo 1 > /proc/sys/net/ipv4/ip_forward \
    && pptpd \
    && syslogd -n -O /dev/stdout
