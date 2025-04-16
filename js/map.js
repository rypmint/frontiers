document.addEventListener('DOMContentLoaded', function() {
    // Initialize map centered on NYC
    var map = L.map('map').setView([40.75, -73.98], 12);
    
    // Add base map layer
    var baseMap = L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=HllAfjj3pONjq3ZOwIpPVIaDDqmBCT5HCEV7BGaC5sfMZSc7ZKVXkwVOex0cpBL1', {
        attribution: '&copy; <a href="https://jawg.io/">Jawg Maps</a>',
        maxZoom: 22
    }).addTo(map);
    
    var darkMap = L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=HllAfjj3pONjq3ZOwIpPVIaDDqmBCT5HCEV7BGaC5sfMZSc7ZKVXkwVOex0cpBL1', {
        attribution: '&copy; <a href="https://jawg.io/">Jawg Maps</a>',
        maxZoom: 22
    });
    
    // Style for boundaries based on permeability
    function boundaryStyle(feature) {
        var permeability = feature.properties.permeability || 5;
        var weight = 3 - (permeability * 0.2);
        var opacity = 0.4 + (permeability * 0.05);
        
        return {
            color: "#000000",
            weight: weight,
            opacity: opacity,
            fillOpacity: 0.05
        };
    }
    
    // Add NYC boundary to map
    var boundaryLayer = L.geoJSON(nycBoundaries, {
        style: boundaryStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`
                <h3>${feature.properties.name}</h3>
                <p>Category: ${feature.properties.category}</p>
                <p>Permeability: ${feature.properties.permeability}/10</p>
            `);
        }
    }).addTo(map);
    
    // Custom icon styling for entry points
    function getEntryPointIcon(type, flowVolume) {
        // Base size on flow volume
        var size = 14 + (flowVolume * 0.8);
        var className = 'entry-point ' + type;
        var iconHtml;
        
        // Different HTML/shapes for different types
        switch(type) {
            case 'bridge':
                iconHtml = '<div class="entry-dot bridge"></div>';
                break;
            case 'tunnel':
                iconHtml = '<div class="entry-dot tunnel"></div>';
                break;
            case 'rail':
                iconHtml = '<div class="entry-dot rail"></div>';
                break;
            default:
                iconHtml = '<div class="entry-dot"></div>';
        }
        
        return L.divIcon({
            className: className,
            html: iconHtml,
            iconSize: [size, size],
            iconAnchor: [size/2, size/2]
        });
    }
    
    // Add NJ entry points to map
    var entryPointsLayer = L.layerGroup().addTo(map);
    
    njEntryPoints.forEach(function(point) {
        var latlng = [point.geometry.coordinates[1], point.geometry.coordinates[0]];
        var icon = getEntryPointIcon(point.properties.type, point.properties.flowVolume);
        
        var marker = L.marker(latlng, {icon: icon}).addTo(entryPointsLayer);
        
        // Enhanced popup with flow visualization
        marker.bindPopup(`
            <div class="entry-popup">
                <h3>${point.properties.name}</h3>
                <p><strong>Type:</strong> ${point.properties.type.charAt(0).toUpperCase() + point.properties.type.slice(1)}</p>
                <p><strong>Flow Volume:</strong></p>
                <div class="flow-meter">
                    <div class="flow-value" style="width: ${point.properties.flowVolume * 10}%;"></div>
                </div>
                <p>${point.properties.description}</p>
            </div>
        `);
    });
    
    // Style for flow lines based on type and volume
    function flowLineStyle(feature) {
        var flowVolume = feature.properties.flowVolume;
        var dashArray;
        var color;
        
        // Different styles for different types
        switch(feature.properties.type) {
            case 'bridge':
                color = '#e74c3c';
                dashArray = null;
                break;
            case 'tunnel':
                color = '#f39c12';
                dashArray = '5, 10';
                break;
            case 'rail':
                color = '#2ecc71';
                dashArray = '10, 5, 2, 5';
                break;
            default:
                color = '#3498db';
                dashArray = null;
        }
        
        return {
            color: color,
            weight: 1 + (flowVolume * 0.4),
            opacity: 0.7,
            dashArray: dashArray
        };
    }
    
    // Add flow lines to map
    var flowLinesLayer = L.geoJSON(flowLines, {
        style: flowLineStyle
    }).addTo(map);
    
    // Add legend
    var legend = L.control({position: 'bottomright'});
    
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <h4>URBAN CELL ELEMENTS</h4>
            <div class="legend-item"><span style="display: inline-block; width: 20px; height: 3px; background-color: black; opacity: 0.8;"></span> Strong Boundary</div>
            <div class="legend-item"><span style="display: inline-block; width: 20px; height: 1px; background-color: black; opacity: 0.5;"></span> Permeable Boundary</div>
            <h4 style="margin-top: 10px;">RECEPTOR SITES</h4>
            <div class="legend-item"><span style="display: inline-block; width: 10px; height: 10px; background-color: #e74c3c; border-radius: 0; transform: rotate(45deg);"></span> Bridge</div>
            <div class="legend-item"><span style="display: inline-block; width: 10px; height: 10px; background-color: #f39c12; border-radius: 50%; border: 2px dashed white;"></span> Tunnel</div>
            <div class="legend-item"><span style="display: inline-block; width: 10px; height: 10px; background-color: #2ecc71; border-radius: 50%; border: 2px solid white;"></span> Rail</div>
        `;
        return div;
    };
    
    legend.addTo(map);
    
    // Add layer controls for toggling different views
    var baseMaps = {
        "Light Map": baseMap,
        "Dark Map": darkMap
    };
    
    var overlayMaps = {
        "City Boundary": boundaryLayer,
        "Entry Points": entryPointsLayer,
        "Flow Lines": flowLinesLayer
    };
    
    L.control.layers(baseMaps, overlayMaps).addTo(map);
});
