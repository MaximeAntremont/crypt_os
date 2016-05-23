goto encomments
REM  -itsoffset 00:00.16 is pretty good but may be adjusted
REM ffmpeg -y -thread_queue_size 512 -f dshow -i video="@device_pnp_\\?\usb#vid_5986&pid_055c&mi_00#6&38cd688a&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global" -itsoffset 00:00.22 -f dshow -i audio="Microphone (Realtek High Definition Audio)" -t 00:00:10 -q 0 -strict experimental ./files/itoffset_sync_19.avi
:encomments

 ffmpeg -y -thread_queue_size 512 -f dshow -video_size 1280x720 -i video="@device_pnp_\\?\usb#vid_045e&pid_0779&mi_00#6&c284952&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global":audio="@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\wave_{4C4A4299-7FC9-4573-A1C8-7AD81EF8AAA5}" -t 00:00:10 -q 0 -strict experimental -map 0:0 -preset ultrafast -tune zerolatency -b 900k -s 320x240 -f mjpeg udp://127.0.0.1:1234/ -q 0 -t 00:00:10 -map 0:0 -map 0:1 ./files/cs.avi