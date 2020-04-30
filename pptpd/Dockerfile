#
# Dockerfile for pptpd
#
FROM alpine

RUN apk add --no-cache iptables ppp pptpd

EXPOSE 1723

CMD set -xe \
    && iptables --table nat --append POSTROUTING --out-interface ppp0 -j MASQUERADE \
    && iptables -I INPUT -s 192.168.97.0/8 -i ppp0 -j ACCEPT \
    && iptables --append FORWARD --in-interface eth0 -j ACCEPT \
    && echo 1 > /proc/sys/net/ipv4/ip_forward \
    && pptpd \
    && syslogd -n -O /dev/stdout
