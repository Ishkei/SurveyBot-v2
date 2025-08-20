

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>

</title>

    <! -- Configure the sync.js script -->
    
        <script>
            !function() {
                // Callback that will be triggered after each call to sync()
                // and let you have access to the profile and/or panorama ids
                var syncCallback = function(profile) {
                    // Get the panorama id
                    var panoramaId = profile.getPanoramaId();

                    var lotameImg = document.createElement('img');
                    lotameImg.src = "https://usersync.samplicio.us/lotame_pano/pixel.gif?id=".concat(panoramaId);
                    document.getElementById('integration-container').appendChild(lotameImg);
                };

                var lotameClientId = '13622';
                var lotameTagInput = {
                    config: {
                        onProfileReady: syncCallback
                    }
                };

                // Lotame initialization
                var lotameConfig = lotameTagInput.config || {};
                var namespace = window['lotame_sync_'+ lotameClientId] = {};
                namespace.config = lotameConfig;
                namespace.data = {};
                namespace.cmd = namespace.cmd || [];
            } ();
        </script>
            <!-- Pull the sync.js script itself in -->
        <script async src="https://tags.crwdcntrl.net/lt/c/13622/sync.min.js"></script>

        <script>
            var dataObject = {
                thirdParty: {
                namespace: 'LUCD',
                value: '25c60be2-e290-4e4a-9bb2-fe3e52f97324'
            }};
            window.lotame_sync_13622.cmd.push(function(){
                window.lotame_sync_13622.sync(dataObject);
            });
        </script>
    </head>
<body>
    <form method="post" action="./ThirdPartyTrackingIntegration.aspx?PartnerName=lotame_pano&amp;RSID=25c60be2-e290-4e4a-9bb2-fe3e52f97324" id="form1">
<div class="aspNetHidden">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTA4ODEzNjI2NmRkS3iY95COh+2t+tiFEkjx3X9cWUk=" />
</div>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="88684948" />
</div>
        <div id="integration-container">
        </div>
    </form>
</body>
</html>
