FROM nginx:alpine

# คัดลอกไฟล์ longan_map.html ไปเป็น index.html ของ nginx
COPY longan_map.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
