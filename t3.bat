ffmpeg -y -thread_queue_size 512 -f dshow -i video="@device_pnp_\\?\usb#vid_5986&pid_055c&mi_00#6&38cd688a&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global" -itsoffset 00:00.05 -f dshow -i audio="Microphone (Realtek High Definition Audio)" -t 00:00:10 -q 0 -strict experimental ./files/itoffset_sync_5.mp4 &