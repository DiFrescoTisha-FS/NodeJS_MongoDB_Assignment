import React from 'react'

const SoundCloudWidget = () => {
  return (
    <>
    <iframe title="iframe" width="100%" height="500px" allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1469353666%3Fsecret_token%3Ds-kPkEQeIKEYX&color=%23e1affd&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
    </iframe>
    <div className="text-xs text-gray-100break-words break-normal overflow-hidden whitespace-nowrap text-ellipsis text-100"><a href="https://soundcloud.com/trapstarbam" title="Trapstar Bam" target="_blank" rel="noopener noreferrer" className="text-gray-100 underline-none">Trapstar Bam</a> · <a href="https://soundcloud.com/trapstarbam/sets/bams-beats/s-kPkEQeIKEYX" title="Bam&#x27;s Beats" target="_blank" rel="noopener noreferrer" className="text-gray-100 underline-none">Bam&#x27;s Beats</a></div>
    </>
  )
}

export default SoundCloudWidget;