// NJ Entry Points - Receptor Sites
var njEntryPoints = [
    {
        "type": "Feature",
        "properties": {
            "name": "George Washington Bridge",
            "type": "bridge",
            "flowVolume": 9,
            "description": "Primary northern crossing connecting Fort Lee, NJ and Upper Manhattan"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-73.9527, 40.8517]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "Lincoln Tunnel",
            "type": "tunnel",
            "flowVolume": 8,
            "description": "Three-tube tunnel connecting Weehawken, NJ and Midtown Manhattan"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-74.0167, 40.7628]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "Holland Tunnel",
            "type": "tunnel",
            "flowVolume": 7,
            "description": "Twin-tube tunnel connecting Jersey City, NJ and Lower Manhattan"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-74.0259, 40.7277]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "North River Tunnels",
            "type": "rail",
            "flowVolume": 10,
            "description": "Twin rail tunnels carrying Amtrak and NJ Transit trains under the Hudson"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-74.0045, 40.7665]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "PATH Downtown Hudson Tubes",
            "type": "rail",
            "flowVolume": 8,
            "description": "Rapid transit system connecting Newark, Jersey City, and Hoboken to Manhattan"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-74.0091, 40.7165]
        }
    }
];

// Flow lines showing the actual paths
var flowLines = [
    {
        "type": "Feature",
        "properties": {
            "name": "GW Bridge Flow",
            "type": "bridge",
            "flowVolume": 9
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.0105, 40.8517], // NJ side
                [-73.9527, 40.8517]  // NY side
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "Lincoln Tunnel Flow",
            "type": "tunnel",
            "flowVolume": 8
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.0320, 40.7628], // NJ side
                [-74.0167, 40.7628]  // NY side
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "Holland Tunnel Flow",
            "type": "tunnel",
            "flowVolume": 7
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.0450, 40.7277], // NJ side
                [-74.0259, 40.7277]  // NY side
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "North River Tunnels Flow",
            "type": "rail",
            "flowVolume": 10
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.0320, 40.7665], // NJ side
                [-74.0045, 40.7665]  // NY side
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "PATH Downtown Tubes Flow",
            "type": "rail",
            "flowVolume": 8
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.0320, 40.7165], // NJ side
                [-74.0091, 40.7165]  // NY side
            ]
        }
    }
];
