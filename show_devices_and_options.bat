ffmpeg -list_devices true -f dshow -i dummy
pause
ffmpeg -f dshow -list_options true -i video="@device_pnp_\\?\usb#vid_5986&pid_055c&mi_00#6&38cd688a&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global":audio="Microphone (Realtek High Definition Audio)"
pause