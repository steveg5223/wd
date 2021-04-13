import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormRow from './FormRow';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  
  export default function About(props) {
      return (
          <div>
              <h2>Why do I love watches?  I'm not sure. </h2>
                <p>I'm fascinated by the aesthetics and the mechanical complexity. </p>
                <p>My family has been collecting watches for several generations.  I'm drawn to extend the collection. </p>
                <p>One of my earliest watch memories was from the early 60's.  I can remember my grandfather and uncle comparing 25 year watches from General Motors.  General Motors gave you a very nice Omega gold watch after 25 years.  It was very luxurious for a man of their generation to own a gold watch. </p>
                <p>The first watch I remember owning was a Bulova Caravelle automatic.  It was a Christmas present from my parents.  It looked like my grandfathers gold watch.  It shone, and it had a cream colored dial with square radium lume at the end of the minute and hour hands.  It had the date at 3, and arabic numerals at 6, 9 & 12.  I loved that I didn't have to wind it.  It came to life when I put it on.  It almost needed to be worn to fulfill its destiny.  That watch served me very well.  It kept me on time for classes through college.  It marked the hours at my first few jobs and first few dates.  After ten years, it was battered, the face was water stained, and the radium was flaking off the hands.  I was sad when I knew it was time to put it to rest. I wish I had taken better care of it, and had it repaired when it needed repair.  I would have it to this day, and thus, perhaps, not gone on to collect dozens of watches to take its place.  I've never been able to fill the hole in my heart left when that watch died.  Maybe I never will. </p>
                <p>What's not to love about a watch?  The design, the materials, the technology, the beauty, the overall aesthetic fill me with happiness.  I am most drawn to watches from the "golden age", from the 50's until the quartz revolution destroyed many of the great watch makers.  So I am an automatic watch man, though a few manual winding and quartz watches have caught my eye and infiltrated my collection. </p>
                <p>I buy most of my watches from eBay.  They mainly come from the US and England.  I've also bought from as far away as Montevideo, Singapore, Hong Kong, Turkey, Hungary, Bulgaria, Pakistan and Saudi Arabia. </p>
                <p>Just don't tell Mr. Baume, my watch repairman, my obi wan Kenobi.  He's Swiss and old school.  When I bring a watch to him, he usually doesn't react.  He just says: "what do we have here?"  They are so discreet, those Swiss craftsmen.  I've known Mr. Baume since 1979.  My girlfriend calls him the longest relationship of my adult life.</p>
                <p>Mr. Baume just retired, and I'm bereft.  With him as my watchmaker, I was very confident in my search for watches.  The world is suddenly scarier and less familiar without him.  I still haven't found a replacement, but I am in the hunt.  I'm sure another Mr. Baume is out there.  I just hope he is younger than I.  I'd hate to have to break in another watch guy in my lifetime</p>
                <p>I just started studying watchmaking using the Timezone Online Watch School.  I've completed lessons 1 and 2.  It's given me enough confidence to start repairing watches on my own.  My first watch is an ETA2801-2 watch I built for Jennifer, the love of my life.  Ask her when you see her, she'd be glad to show it off.</p>
                <p>I've even done a few repair jobs for friends.  The first was a 80's era pocket watch.  It had an ETA6497 movement with a broken mainspring.  It was similar to one of the movements I took apart in the online watch school.  I knew what to do.  I disassembled it, ordered parts, and reassembled it with the new barrel and mainspring.  I've repaired a number of other watches.  They have all be quartz, so the only thing you can do is replace the battery.</p><p>I've started working on some of my Dad's old watches.  There is one,  den-ro with an AS1194 movement.  I'm trying to use an old chinese coin as the face, but it's been difficult.  WHen it's done, I'll post photos of the completed item.</p>
                <h2>About this site</h2>
                <p>I started this site to capture the accuracy of my watch collection.  The first thing this site showed was the table of observations for each watch.  This was an outgrowth of an excel spreadsheet I maintained.</p>
                <p>It's grown beyond that.  I added the graph using the open source flot() javascript graphing package.  I added picture gallery as part of each watch page.</p>
                <p>The last function I added was a collection list and a du jour page that shows the watch I wore the longest ago.  I use it to keep the watches from getting jealous.  Every morning I refer to this site, and see what I should wear.  If any watch complains about being ignored (*cough* Longines ref 1088 *cough*) I just say: "take it up with the web site."  Since very few watches have internet access, this nearly always quiets them down.  </p>
                <p>I created this site using create react app and the google material UI react components</p>
                <p>My name is Steve Goodwin, and I live in the SF Bay Area.</p>
                <p>I’m a software engineer and I’m learning to be a watchmaker. I started with the timezone.com online watch school.  I highly recommend it.  I’ve learned a lot form the course, and I’ve started buying non running watches from eBay and fixing them.  Most simply need to be cleaned and serviced.</p>
                <p>If you want to contact me, mail me at: <a href="mailto:stv.goodwin@gmail.com?Subject=Comments on your watch site">Click Here</a></p>
          </div>
      );
  }

