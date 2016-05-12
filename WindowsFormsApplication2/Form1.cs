using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApplication2
{
    public partial class Form1 : Form
    {

        static Process process = null;
        static int lineCount = 0;
        static AxAXVLC.AxVLCPlugin2 player;

        public Form1()
        {
            InitializeComponent();
        }

        static void ExecuteCommand(string command)
        {
            int exitCode;
            ProcessStartInfo processInfo;
            process = new Process();

            processInfo = new ProcessStartInfo("cmd.exe", "/c " + command);
            processInfo.CreateNoWindow = true;
            processInfo.UseShellExecute = false;

            // *** Redirect the output ***
            processInfo.RedirectStandardError = true;
            processInfo.RedirectStandardOutput = true;

            //Thread threadObj = new Thread(new ThreadStart(() => ConverToPdf("a", "b")));
            //threadObj.Start();

            process.EnableRaisingEvents = true;

            process.ErrorDataReceived +=
        new DataReceivedEventHandler(process_ErrorDataReceived);
            process.OutputDataReceived +=
                new DataReceivedEventHandler(process_OutputDataReceived);
            process.Exited += new EventHandler(process_Exited);

            process.StartInfo = processInfo;

            process.Start();

            process.BeginOutputReadLine();
            process.BeginErrorReadLine();
            //process.WaitForExit();

            /*Thread.Sleep(2000);
            player.playlist.add("D:/Documents/Visual Studio 2013/Projects/WindowsFormsApplication2/WindowsFormsApplication2/bin/Debug/files", null, null);
            player.playlist.play();*/


            // *** Read the streams ***
            // Warning: This approach can lead to deadlocks, see Edit #2
            //process.Close();
        }

        private static void process_Exited(object sender, EventArgs e)
        {
            process.Dispose();
            Console.WriteLine("Bye bye!");
        }

        private static void process_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            //Console.WriteLine("Output Data Received.");
        }

        private static void process_ErrorDataReceived(object sender, DataReceivedEventArgs e)
        {
            /*Console.WriteLine("Input line: {0} ({1:m:s:fff})", lineCount++,
      DateTime.Now);
            Console.WriteLine(e.Data);
            Console.WriteLine();*/
            if(e.Data == "Press [q] to stop, [?] for help"){
                Console.WriteLine("Record started !");
                player.playlist.add("udp://@127.0.0.1:1234/", "udp://@127.0.0.1:1234/", null);
                player.playlist.play();
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog1 = new OpenFileDialog();
            if(openFileDialog1.ShowDialog() == DialogResult.OK){
                Console.WriteLine(openFileDialog1.FileName);
                Console.WriteLine(openFileDialog1.SafeFileName);
                axVLCPlugin21.playlist.add(openFileDialog1.FileName, openFileDialog1.SafeFileName, null);
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            axVLCPlugin21.playlist.play();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            player = axVLCPlugin21;
            ExecuteCommand("D:/Documents/_DEV/Confluence/ffmpeg_junks/record_audio_video_avi.bat");
        }
    }
}
