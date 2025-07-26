import { copyFileSync } from 'fs';
import bands from './bands.json'; 
import { Console } from 'console';
// сделать меп для всех последующих заданий
type MusicBand = { 
name: string; 
genre: string; 
members: BandMember[]; 
originCountry: string; 
foundedYear: number; 
trackCount: number; 
}; 

type BandMember = { 
name: string; 
instrument: string; 
};

const musicBands: MusicBand[] = bands;

//Bands serch by genre
function findGenre(genre: Genre) : Array<MusicBand> {
    return musicBands.filter(band => band.genre == genre);

} 

function getBandsName(array: MusicBand[] ){
    if(array == null) return;

    array.forEach((band, i) => {
    console.log(`${i+1}.`);
    console.log(`[${band.name}]`);
    console.log();
});
}

//First LVL 
// (Function map)

// Bands names
type BandName = {
    name: string
}

const names: BandName[] = musicBands.map((band, i) => {
    return {
        name: band.name
    };
});

names.forEach((band, i) => {
    console.log(`${i+1}.`);
    console.log(`[${band.name}]`);
    console.log();
});

//Bands descriptions
type BandDescription = {
    name: string;
    genre: string; 
    trackCount: number; 
}

const descriptions: BandDescription[] = musicBands.map((band, i) => {
    return {
        name: band.name,
        genre: band.genre,
        trackCount: band.trackCount
    };
});

descriptions.forEach((band, i) => {
    console.log(`${i+1}.`);
    console.log(`[${band.name}]`);
    console.log(`[${band.genre}]`);
    console.log(`[${band.trackCount}]`);
    console.log();
});


// (Function filter)
enum Genre{
    rock = "Rock",
    punck = "Punk",
    metal = "Metal",
    alterRock = "Alternative Rock"
}

enum OriginCountry{
    USA = "USA",
    UK = "UK",
    Australia = "Australia"
}

//Founded after the 2000s
const modernBands = musicBands.filter(band => band.foundedYear > 2000);

console.log("Bands was founded after the 2000s : ")
getBandsName(modernBands);

//More than 100 tracks
const manyTracks = musicBands.filter(band => band.trackCount > 100);

console.log("More than 100 tracks bands : ")
getBandsName(manyTracks);

//Gener ROCK
const rockGeners = findGenre(Genre.rock);

console.log("Rock bands : ")
getBandsName(rockGeners);

//Founded before the 1980s
const oldBands = musicBands.filter(band => band.foundedYear < 1980);

console.log("Bands was founded before the 1980s: ")
getBandsName(oldBands);

//From USA
const bandsUSA = musicBands.filter(band => band.originCountry == OriginCountry.USA);

console.log("Bands from USA: ")
getBandsName(bandsUSA);

// (Function reduse)

//Total tracs
const totalTracs = musicBands.reduce((acamulator, band) => {
    return acamulator += band.trackCount;
}, 0);

console.log('Total track: ' + totalTracs);

//Total group members
const totalGroupMembers = musicBands.reduce((acamulator, band) => {
    return acamulator += band.members.length;
}, 0);

console.log('Total group members: ' + totalGroupMembers);

//Second LVL

//Most tracks
type BandAndTracksCount = {
    name: string
    countTrecks: number
}

const bandAndTracks: BandAndTracksCount[] = musicBands.map((band, i) => {
    return {
        name: band.name,
        countTrecks: band.trackCount
    };
});

//!!! добавить масив если треков одинаковое количество !!!
bandAndTracks.sort((a,b) => a.countTrecks - b.countTrecks);
console.log("Have a most tracks: " + bandAndTracks[bandAndTracks.length-1].name + " ( " + bandAndTracks[bandAndTracks.length-1].countTrecks + " )")

//Bands gener "Rock" or "Alternative Rock"
const rockBands = findGenre(Genre.rock);
const alterRockBands = findGenre(Genre.alterRock);

console.log("Rock genre bands: ")
getBandsName(rockBands);

console.log("Alternative Rock genre bands: ")
getBandsName(alterRockBands);

//Longest name members
type BandMembership = {
    name: string
    members: BandMember[]
}

const bandsAndMembers: BandMembership[] = musicBands.map((band, i) => {
    return {
        name: band.name,
        members: band.members
    };
});


type BandAndMember = {
    nameLength: number
    memberName:string
    bandName: string
}

let longestName: number = 0;
let memberName
let bandName: string;

let longestNameList: Array<BandAndMember>;

bandsAndMembers.forEach((band, i) => {

    band.members.forEach((member, i) => {

        if(member.name.length > longestName){
            longestName = member.name.length;
            memberName = member.name;
            bandName = band.name;

            longestNameList = null;
        }
        else if (member.name.length == longestName){
            let data: BandAndMember = {
                nameLength : member.name.length,
                memberName : member.name,
                bandName : band.name
            }
            longestNameList.push(data);
        }

    });
   
});

if(longestNameList!=null){
    console.log("THE LONGEST NAME LIST");
    longestNameList.forEach((data, i) =>{
        console.log(i+1);
        console.log("Band: " + data.bandName);
        console.log(`${data.memberName} (${data.nameLength})`)
        console.log()
    });
}
else{
        console.log("The LONGEST NAME");
        console.log("Band: " + bandName );
        console.log(`${memberName} (${longestName})`)
        console.log()
}


//Output year and name band (N13)
type BandFound= {
    name: string
    foundyear: number
}

const bandAndFoundYear: BandFound[] = musicBands.map((band, i) => {
    return {
        name: band.name,
        foundyear: band.foundedYear
    };
});

bandAndFoundYear.sort((a,b) => b.foundyear - a.foundyear)
bandAndFoundYear.forEach((band, i)=>{
    console.log(`[${band.foundyear}] - [${band.name}]`);
});

//Output has more then 3 members (N14)

type BandMemberCount= {
    name: string
    members:  BandMember[]
}

const bandMemberCount: BandMemberCount[] = musicBands.map((band, i) => {
    return {
        name: band.name,
        members: band.members
    };
});

bandMemberCount.forEach((band)=>{
    console.log(`[${band.name}]`);
    if(band.members.length > 3) {
        console.log(`has more than 3 members`)
    }
    else {
        console.log(`has NOT more than 3 members`)
    }
    console.log(`Participant number [${band.members.length}]`);
    console.log();
});


//Third LVL

//Unique genre (N15)

const uniqueGenerList = new Set();

musicBands.forEach((band) => {
    uniqueGenerList.add(band.genre);
});

console.log("===Genre list===");
uniqueGenerList.forEach((genre) => {
   console.log(`[${genre}]`);
});

//Country is a key for count song (N16)

const listCountry:string[] = Object.keys(OriginCountry);
let songsInCountry: Record<string, number>={};

musicBands.forEach((band)=>{
    listCountry.forEach((countryName)=>{
        if(band.originCountry == countryName){
            if(songsInCountry[countryName] === undefined){
                songsInCountry[countryName] = band.trackCount
            }
            else{
                songsInCountry[countryName] += band.trackCount;
            }
        }
    });
});

console.log(songsInCountry[OriginCountry.Australia]);

//Array element = instrument (N17)

type MemberInstrument = {
    members: BandMember[]
}

const memberAndInstruments: MemberInstrument[] = musicBands.map((band, i) => {
    return {
        members: band.members
    };
});

let bandsInstruments: Array<Array<string>> = new Array ;

memberAndInstruments.forEach((band,i) => {
    let cashInstruments: Array<string>=new Array;
    band.members.forEach((member,i) => {
        cashInstruments.push(member.instrument);
    });
    bandsInstruments.push(cashInstruments);
});

//сделать вывод

//Unique instruments (N18) ONE TYPE LIKE 17 task 
const uniqueInstrumentsList = new Set();

memberAndInstruments.forEach((band,i) => {
    band.members.forEach((member,i) => {
        uniqueInstrumentsList.add(member.instrument);
    });
});

uniqueInstrumentsList.forEach((i)=>{
    console.log(i);
});

//Bands and members names lenghts list (N19)
type BandsAndMembersNameLength = {
    bandName: string
    membersNamesLength: Array<number>
}

let bandsAndMembersNameLength : Array<BandsAndMembersNameLength> = new Array;
musicBands.forEach((band) => {
    let cashLength : Array<number> = new Array;

    band.members.forEach((member) => {
        cashLength.push(member.name.length);  
    });

    const result : BandsAndMembersNameLength = {
        bandName : band.name,
        membersNamesLength : cashLength
       }
    bandsAndMembersNameLength.push(result);
});

bandsAndMembersNameLength.forEach((a)=>{
    console.log(a);
});

//LVL 4
//ezy peazy (N20)

//(map)
function mapK<Type>(value: Type[]):Type[]{
    if(value == null) return;

    let array: Type[];
    for(let i = 0; i < value.length+1; i++ ){
        array.push(value[i])
    }

    return array;
}

function forEachK<Type>(callback){
    for(let i = 0; i < this.length+1; i++ ){
        callback(this[i], i);
    }
}

let array: Array<string> = ["a","b","g"];
forEachK((array)=>{
    console.log(array);
});
