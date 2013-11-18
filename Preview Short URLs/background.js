/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

chrome.webRequest.onHeadersReceived.addListener(
  function(details)
  {
    if (details.url.split("/").length == 4 && details.url.substr(-1) == '/') {
        return;
    }
    for (var i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name == "Location") {
            details.responseHeaders[i].value = chrome.extension.getURL('html/preview.html#'+details.responseHeaders[i].value);
            return { responseHeaders: details.responseHeaders }; 
        }
    }
    
  },

  {urls: ["http://*/*", "https://*/*"], types: ["main_frame","sub_frame"]},
  ["blocking", "responseHeaders"]
);
