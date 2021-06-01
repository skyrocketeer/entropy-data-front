/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.d.ts" />
/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/CustomMapStyles.d.ts" />
/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Modules/Search.d.ts"/>

import { useCallback, useEffect, useRef, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export default function Map() {
  // const { register } = props
  // const { ref } = register as { ref: (instance: HTMLInputElement | null) => void }
  // const inputRef = useRef<HTMLInputElement | null>(null)

  const [searchInput, setSearchInput] = useState({
    latitude: 10.786027416200668,
    longitude: 106.685546875,
    altitude: 0,
    altitudeReference: -1
  })

  let map: Microsoft.Maps.Map
  let searchManager: Microsoft.Maps.Search.SearchManager

  function drawMap() {
    map = new Microsoft.Maps.Map('#myMap', {
      zoom: 13
    });

    const pushpin = new Microsoft.Maps.Pushpin(searchInput, {
      color: '#f00',
      draggable: true
    });
    map.entities.push(pushpin);

    Microsoft.Maps.Events.addHandler(
      pushpin,
      'dragend',
      (args) => {
        setSearchInput({
          ...searchInput,
          latitude: pushpin.getLocation().latitude,
          longitude: pushpin.getLocation().longitude
        })
        console.log(searchInput)
        map.entities.push(pushpin);
        reverseGeocode()
      }
    );
  }

  const reverseGeocode = () => {
    //If search manager is not defined, load the search module.
    if (!searchManager) {
      //Create an instance of the search manager and call the reverseGeocode function again.
      Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        searchManager = new Microsoft.Maps.Search.SearchManager(map);
        reverseGeocode();
      });
    } else {
      const searchRequest = {
        location: { ...searchInput },
        callback: function (r: any) {
          //Tell the user the name of the result.
          alert(r.name);
        },
        errorCallback: function (e) {
          //If there is an error, alert the user about it.
          alert("Unable to reverse geocode location.", e);
        }
      };

      //Make the reverse geocode request.
      searchManager.reverseGeocode(searchRequest);
    }
  }

  useEffect(() => {
    drawMap()
  }, [])

  return (
    <>
      <div id="myMap" />
    </>
  )
}