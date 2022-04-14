/** Functions for astronomy states */

export const coords = (coord) => {
    let ra_parts = coord.split(' ')[0].split(':');
    let dec_parts = coord.split(' ')[1].split(':');

    let ra = 15*(parseFloat(ra_parts[0]) 
            + (parseFloat(ra_parts[1]) / 60) 
            + (parseFloat(ra_parts[2]) / 3600));

    let sign = '';
    if (dec_parts[0].includes("+")) sign = '+';
    if (dec_parts[0].includes("-")) sign = '-';

    let dec = (parseFloat(dec_parts[0]) 
            + (parseFloat(sign+dec_parts[1]) / 60)
            + (parseFloat(sign+dec_parts[2]) / 3600));
    return({ ra: ra, dec: dec});
}

export const set_planetarium = (transit) => {
    // eslint-disable-next-line
    eval(`
        var planetarium${transit.nr} = $.virtualsky({
            'id': 'starmap${transit.nr}',
            'projection': 'gnomic',
            'ra': ${coords(transit["coords(J2000)"]).ra},
            'dec': ${coords(transit["coords(J2000)"]).dec},
            'ground': false,
            'constellations': true,
            'constellationlabels': true,
            'fov': 20,
            'showdate': false,
            'showposition': false
        });

        planetarium${transit.nr}.addPointer({
            'ra': ${coords(transit["coords(J2000)"]).ra},
            'dec': ${coords(transit["coords(J2000)"]).dec},
            'label':'${transit.Name}',
            'colour':'rgb(255,220,220)'
        });
    `);
}
