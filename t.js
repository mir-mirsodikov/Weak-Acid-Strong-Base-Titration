"use strict";

/* 
    Weak Acid - String Base Titration
    -Need:
        -Volume of container
        -Volume of base/acid
        -Mole of base/acid
    -Calculate:
        -Concentration of base/acid
        -Concentration of H+
        -pH level

    In a 1 liter solution:
    - 0ml of Base ---> 1M of Acid ---> 0M of Base ---> 0.0042M of H+ ---> ph of 2.37
        * volume of base = 0ml
        * volume of system = 1L (1l system + 0ml of Base)
        * mol of acid = 1
        * concentration of Acid = 1(mol) / 1(volume)
        * concentration of base = mol / volume ---> 0 mol / 1 L
        * concentration of H+ = x^2 / mol of acid - x 
        * pH = pKa + log(conBase/ conAcid)
    - 100ml of Base ---> 0.81M of Acid ---> 0.09M of Base
        * volume of base = 100ml
        * volume of system = 1.1L (1L of system + 100ml of base)
        * mol of acid = (mol of acid - mol of base) ---> (1 - 0.1) ---> 0.9
        * concentration of acid = mol of acid / volume of system ---> 0.9 / 1.1L ---> 0.8181
        * mol of base = (volume of base (L) / volume of system)
        * concentration of base = mol of base / volume of system ---> 0.1 / 1.1L
        * concetration of H+ = x^2 + (Ka + [Base])x - (Ka * [Acid])
        
*/

//Variable declarations
let table = document.getElementById("table");
let volume = 1.0;
let concentrationAcid = 0;
let concentrationBase = 0;
let concentrationH = 0;
let pH = 0;
let row = "";
let x = 0;

row += "<table> \
                    <tr> \
                        <th>ml Base</th> \
                        <th>[Acid]</th> \
                        <th>[Base]</th> \
                        <th>[H+]</th> \
                        <th>pH</th> \
                    </tr>";

for (let i = 0; i <= 1000; i++)
{
    concentrationAcid = getMolarityAcid(volume, i);
    concentrationBase = getMolarityBase(volume, i);
    concentrationH = getMolarityH(concentrationAcid, concentrationBase);
    pH = getPh(concentrationH);
    row += "<tr> \
                <td>" + i + "</td>\
                <td>" + concentrationAcid + "</td> \
                <td>" + concentrationBase + "</td> \
                <td>" + concentrationH + "</td> \
                <td>" + pH + "</td> \
                </tr>";
}

table.innerHTML += row;

function getMolarityAcid(volAcid, volBase)
{
    volBase /= 1000;
    return (1 - volBase / 1) / (volAcid + volBase);
}

function getMolarityBase(volAcid, volBase)
{
    volBase /= 1000;
    return (volBase / (volAcid + volBase));
}

function getMolarityH(conAcid, conBase)
{
    const Ka = 1.8 * Math.pow(10, -5);

    let a = 1;
    let b = Ka + conBase;
    let c = -Ka * conAcid;

    let x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    let x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);

    if (x1 > 0.0) return x1;
    else return x2;
}

function getPh(H)
{
    return (-Math.log(H)) / Math.log(10);
}