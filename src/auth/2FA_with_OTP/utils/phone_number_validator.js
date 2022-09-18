const PhoneNumber = require('awesome-phonenumber');

var pn = new PhoneNumber( '+970568028221');
pn.isValid( ) 
 console.log('pn.isValid() :>> ', pn.isMobile( ));  // -> true
pn.isMobile( ); // -> true
pn.canBeInternationallyDialled( ); // -> true
pn.getNumber( );                   // -> '+46707123456'
pn.getNumber( 'e164' );            // -> '+46707123456' (default)
pn.getNumber( 'international' );   // -> '+46 70 712 34 56'
pn.getNumber( 'national' );        // -> '070-712 34 56'
pn.getNumber( 'rfc3966' );         // -> 'tel:+46-70-712-34-56'
pn.getNumber( 'significant' );     // -> '707123456'
pn.getRegionCode( );               // -> 'SE'
pn.getCountryCode( ); 
             // -> 46
pn.toJSON( );                  // -> json blob, so that:
let result =  JSON.stringify( pn, null, 4 ); // -> This:

console.log('result :>> ', result);
PhoneNumber( '+46707123456' ).getRegionCode( )
PhoneNumber.getCountryCodeForRegionCode( 'SE' ); // -> 46
PhoneNumber.getRegionCodeForCountryCode( 46 );   // -> 'SE'


// An instance of the PhoneNumber class will be created even if PhoneNumber is called as a function.

var pn = PhoneNumber( '0568227578', 'SA' );
// is the same as
var pn = new PhoneNumber( '0568227578', 'SA');
// To valid a phone number like
// XXX-XXX-XXXX
// XXX.XXX.XXXX
// XXX XXX XXXX 

function phonenumber(inputtxt)
{
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  var regExp =/ ^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$ /
  if((inputtxt.value.match(phoneno)))
        {
      return true;
        }
      else
        {
        alert("message");
        return false;
        }
}

function phoneNumberPlusSign(inputtxt)
{
  var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  if((inputtxt.value.match(phoneno)))
        {
      return true;
        }
      else
        {
        alert("message");
        return false;
        }
}


