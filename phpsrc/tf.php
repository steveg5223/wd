<?php
    $interval  =  (isset($_REQUEST['interval'])    && $_REQUEST['interval'] > 1)       ? $_REQUEST['interval']    :  30;
    $buff_size =  (isset($_REQUEST['buffer_size']) && $_REQUEST['buffer_size'] > 1)    ? $_REQUEST['buffer_size'] : 100;
    $last_line =  (isset($_REQUEST['last_line'])   && $_REQUEST['last_line'] > 0)      ? $_REQUEST['last_line']   :  0;
    $last_size =  (isset($_REQUEST['last_size'])   && $_REQUEST['last_size'] > 0)      ? $_REQUEST['last_size']   :  0;
if (isset($_REQUEST['server']) && isset($_REQUEST['file']) && $_REQUEST['file'] > "")
{
    // server is set so client is expecting json output
    // open a file and send requested data
    if(@!$line_array = file($_REQUEST['file']))
    {
        $response_array['status']     = false;
        $response_array['reason']     = "unable to open " . $_REQUEST['file'];
        $output = json_encode($response_array);
        print $output;
        return;
    }
    $file_lines                   = count($line_array);
    $last_line                    = ($last_line == 0 ? $file_lines - $buff_size : $last_line);
    if($last_line < 0) $last_line = 0; // if buff_size > file_lines, above line returns negative result
    $response_array['status']     = true;
    $response_array['linect']     = $file_lines;
    $response_array['start_line'] = $last_line;
    $response_array['buff_size']  = $buff_size;
    $response_array['last_size']  = filesize($_REQUEST['file']);
    $response_array['outdata']    = array_slice($line_array, $last_line);
    $output                       = json_encode($response_array);
    print $output;
    return;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>Log File Follow Utility</title>
        <style type="text/css">
            #container
            {
                margin: 0 auto;
                width: 100%;
            }
            #inputdiv, input, div, span, p
            {
                margin: 5px;
            }
            
            #inputdiv
            {
                width: 100%;
                background-color: Gainsboro;
                border: medium double navy;
            }
            #countdown
            {
                margin: 5px;
                width: 50px;
                text-align:right;
            }
            #interval, #buffer_size
            {
                width: 100px;
            }
            th
            {
                text-align: center;
                border: medium double navy;
            }
            table
            {
                border: medium double navy;
                overflow: scroll;
                margin: 0px 0px 0px 5px;
                width: 100%;
                background-color: AliceBlue;
            }
            .seq
            {
            width: 3%;
            text-align: center;
            }
            .left_col
            {
            text-align: center;
            width: 7%;
            }
            .mid_col
            {
            text-align: center;
            width: 8%;
            }
            .right_col
            {
            width: 80%;
            }
        </style>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.min.js"></script>
        <script type="text/javascript">
            /**
           * jQuery's Countdown Plugin
           *
           * display a countdown effect at given seconds, check out the following website for further information:
           * http://heartstringz.net/blog/posts/show/jquery-countdown-plugin
           *
           * @author Felix Ding
           * @version 0.2
           * @copyright Copyright(c) 2008. Felix Ding
           * @license http://www.opensource.org/licenses/bsd-license.php The BSD License
           * @date 2008-03-09
           * @lastmodified 2008-04-22 16:48    		 
           * @todo error & exceptions handling
          */
          jQuery.fn.countdown=function(options){
              if(!options){
                  options="()"
                }
                if(jQuery(this).length==0){
                    return false
                }
                var obj=this;
                if(options.seconds<0||options.seconds=="undefined"){
                    if(options.callback){
                        eval(options.callback)}return null
                    }
                    window.setTimeout(function(){
                        jQuery(obj)
                        .html(String(options.seconds));
                        --options.seconds;
                        jQuery(obj).countdown(options)},1000);
                        return this};
                        jQuery.fn.countdown.stop=function(){
                            window.clearTimeout(setTimeout("0")-1)
                        };
          
          var last_line = 0;
          var follow_log = true;
          var last_size            =    0;
          var status_area = "<span id=\"dttm\"></span>" + 
                             "<span>Status:</span><span id=\"status\"></span>" + 
                              "<span># of Lines in File:</span><span id=\"filelines\"></span>" + 
                              "<span>New Lines:</span><span id=\"newlines\"></span><br/>";
          function get_update() 
          {
            if (!follow_log)
            {
                $('#hl').html("<span>Log Follow Stopped by User Request</span>").effect("highlight", {'color' : 'red'}, 1000);
                return;
            }
            var ourDate       = new Date();
            var request_start = ourDate.toString( );
            $('#dttm').text(request_start);
            $('#status').text("Checking for New Lines");
            
            var filename      = $("#file_name").text();
            var buffer        = $("#buffer_size").val();
            $.ajax(
            {
                type     : "get",
                url      : "tf.php",
                dataType : "json",
                data     : { 'file' : filename, 'last_line' : last_line, 'last_size' : last_size, 'buffer_size' : buffer, 'server': 1 },
                success: function(data)
                {
                  if(!data.status)
                  {
                      var errmsg = "<p>server error @" + ourDate + " Server Reason: " + data.reason +"</p>";
                      $('#errdiv').prepend(errmsg);
                      $('span.countdown').countdown({seconds: 10, callback: 'get_update()'});
                      $('#status').text("Check for New Lines Complete");
                  }
                  else
                  {
                      $('#status').text("Check for New Lines Complete");
                      $('#filelines').text(data.linect);
                      $('#newlines').text(data.outdata.length);
                      last_size = data.last_size;
                      $("#hl").effect("highlight", {'color' : '#FF00FF'}, 3000);
                      if (data.outdata.length > 0)
                      {
                          $('tr:eq(1)').remove();
                          for ( var i in data.outdata )
                          {
                              $('#log_buffer').prepend("<tr><td class=\"seq\"></td><td>" + data.outdata[i] + "</td></tr>");
                          }
                          $('#log_buffer').prepend("<tr><th class=\"seq\">#</th><th class=\"right_col\">Log Rec</th></tr>");
                          $('#log_buffer tr:gt(' + buffer + ')').remove();
                          var seq_num = 0;
                          $("td.seq").each(function() 
                              {
                                  $(this).text(seq_num++);
                              });
                      }
                      highlight_interval = 60 * 1000;
                      if (last_line > 0)
                      {
                          for (i=2; i<=data.outdata.length + 1; i++) // now add sequence #'s to table
                          {
                              $('tr:eq(' + i + ')').effect("highlight", {color: '#0000FF'}, highlight_interval);
                          }
                      }
                  }
                  last_line    = data.linect;
                  last_size    = data.last_size;
                  var myDate   = new Date();
                  var interval = $("#interval").val();
                  $('span#countdown').countdown({seconds: interval, callback: 'get_update()'});
                },
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    var errmsg = "<p>ajax error @" + request_start + " " + textStatus +"</p>";
                    $('#errdiv').prepend(errmsg);
                    $('span#countdown').countdown({seconds: 10, callback: 'get_update()'});
                }
            });
          }
          $(document).ready(function() 
          {
             $("#startfollow").click(function() 
             {
                  follow_log = true;
                  $('#hl').html("<span>Starting Up Log Follow...</span>");
                  $("#hl span").effect("highlight", {'color' : 'green'}, 1000);
                  var t=setTimeout("$('#hl').html(status_area); get_update()",1000);
             });
             $("#endfollow").click(function() 
             {
                 $('#hl').html("<span>Waiting for countdown to end...</span>");
                 follow_log     = false;
                 $("#hl").effect("highlight", {'color' : '#FF00FF'}, 1000);
             });
             $("#clearajax").click(function() 
             {
                 $('#errdiv').html("");
             });
             $("#startfollow").click(); // start follow at load time
          });
        </script>
    </head>
    <body>
        <div id="container">
            <div id="inputdiv">
                <input type="submit" value="start log follow" id="startfollow"/>
                <input type="submit" value="end log follow" id="endfollow"/>
                <input type="submit" value="clear ajax errors" id="clearajax"/>
                <span>Log File to Follow:</span>
                <span name="file" id="file_name">error_log</span>
                <span>Number of lines to display: </span>
                <input name="buffer_size" id="buffer_size" value="<?php print $buff_size ?>"/>
                <span>Polling Interval: </span>
                <input name="interval" id="interval" value="<?php print $interval ?>"/>
                <br/>
                <div id="hl"></div>
                <div id="refresh">Next Refresh in:<span id="countdown"></span>seconds</div>
            </div>
            <div>
            <table style="display:none;">
            <tr><th class="seq"/><th class="left_col"/><th class="mid_col"/><th class="right_col"/></tr>
            </table>
            <table id="log_buffer">
            </table>
            </div>
            <p><span id="errdiv"></span></p>
            <p>
                <a href="http://validator.w3.org/check?uri=referer">
                <img src="http://www.w3.org/Icons/valid-xhtml10-blue" alt="Valid XHTML 1.0 Strict" height="31" width="88" />
                </a>
            </p>
        </div>
    </body>
</html>