import React, { Component } from 'react';

class Camera extends Component {
	render(){
		return(
			<div className="camera">
				<div className="camera__bird-wrapper">
				<svg className="camera__viewfinder" viewBox="0 0 400 300" version="1.1" xmlns="http://www.w3.org/2000/svg">
						    <defs></defs>
					<svg viewBox="0 0 100 75" className="camera__bird" preserveAspectRatio="xMidYMid slice">
						
						<defs>
			        <mask id="mask" maskUnits="userSpaceOnUse"
			              maskContentUnits="userSpaceOnUse">
			            <image className="hero__bird-image" xlinkHref="https://img-fotki.yandex.ru/get/15520/5091629.a4/0_8d416_118079e_orig" 
			                   width="100" height="100"></image>
			        </mask>
			        <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="100%" >
				      	<stop offset="0%" stopColor="#38aeF4" stopOpacity="100%"/>
				      	<stop offset="20%" stopColor="#a026bf" stopOpacity="100%"/>
				      	<stop offset="60%" stopColor="#e82c75" stopOpacity="100%"/>
				      	<stop offset="85%" stopColor="#FCEE21" stopOpacity="100%"/>
				      	<stop offset="95%" stopColor="#38aeF4" stopOpacity="100%"/>        
			      	</linearGradient>
						</defs>
						<g mask="url(#mask)" className="g-container">
       				<rect fill="url(#linear-gradient)" width="100%" height="100%"></rect>
        			<rect fill="url(#linear-gradient)" width="100%" height="100%"></rect>
    				</g>
					</svg>									    
				    <g id="Welcome" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> {/* This needs to be resized to 400 * 300 to work! */}
				      <g id="Landing-Page-Copy" transform="translate(-27.000000, -252.000000)">
				      	<g id="View-Finder" transform="translate(27.000000, 252.000000)">
				          <path d="M-7.04991621e-13,2.99349319 C-7.04991621e-13,1.34023255 1.35068089,0 3.00385919,0 L396.996141,0 C398.655126,0 400,1.33752823 400,2.99349319 L400,297.006507 C400,298.659767 398.649319,300 396.996141,300 L3.00385919,300 C1.34487357,300 -7.04991621e-13,298.662472 -7.04991621e-13,297.006507 L-7.04991621e-13,2.99349319 Z M16,24.0043498 L16,243.99565 C16,248.410871 19.584788,252 24.006848,252 L375.993152,252 C380.417012,252 384,248.416331 384,243.99565 L384,24.0043498 C384,19.5891288 380.415212,16 375.993152,16 L24.006848,16 C19.5829878,16 16,19.5836695 16,24.0043498 Z" id="Combined-Shape" fill="#333333"></path>
				            <g id="HUD" transform="translate(19.333333, 266.666667)">
				              <text id="125-5.6" fontFamily="AvenirNext-Medium, Avenir Next" fontSize="16" fontWeight="400" fill="#F6F6F6">
				                <tspan x="46.4533333" y="16">125  5.6</tspan>
				              </text>
				              <text id="ISO-200" fontFamily="AvenirNext-Italic, Avenir Next" fontSize="14" fontStyle="italic" fontWeight="normal" fill="#F6F6F6">
				                <tspan x="305.394667" y="14">ISO </tspan>
				                <tspan x="332.106667" y="14" fontFamily="AvenirNext-Medium, Avenir Next" fontSize="16" fontWeight="400">200</tspan>
				              </text>
				              <text id="3..2..1..0..1..2..3" fontFamily="AvenirNext-Medium, Avenir Next" fontSize="16" fontWeight="400" fill="#F6F6F6">
				                <tspan x="122.72" y="16">3..2..1..0..1..2..3</tspan>
				              </text>
				                <g id="stabilze" transform="translate(26.500000, 11.354167) rotate(90.000000) translate(-26.500000, -11.354167) translate(19.000000, -0.145833)" fillRule="nonzero" fill="#FFE340">
				                  <path d="M11.1913747,6.25276025 C11.1326655,6.25276025 11.0664416,6.22317084 11.022762,6.19405109 C9.8119443,5.25470455 8.79181396,4.69720238 7.20666667,4.69720238 C4.9902785,4.69720238 3.30227277,6.25322993 3.22195864,6.25322993 C3.05334593,6.25322993 1.99658107,5.19646507 1.99658107,5.02033759 C1.99658107,4.96162843 2.02617049,4.90291927 2.0698501,4.85876999 C3.38352624,3.54509385 5.36507777,2.8185093 7.20713634,2.8185093 C9.04919491,2.8185093 11.0307464,3.54509385 12.3444226,4.85876999 C12.3885719,4.90291927 12.4176916,4.96162843 12.4176916,5.02033759 C12.4176916,5.19646507 11.3609267,6.25322993 11.192314,6.25322993 L11.1913747,6.25276025 Z M13.180441,4.26369395 C13.1217318,4.26369395 13.0630227,4.23410454 13.0188734,4.19747002 C11.3238226,2.70766641 9.49632386,1.87869308 7.20666667,1.87869308 C4.91700947,1.87869308 3.08951078,2.70813608 1.39445994,4.19747002 C1.35031065,4.23410454 1.29160149,4.26369395 1.23289234,4.26369395 C1.06427963,4.26369395 2.93098879e-14,3.20692909 2.93098879e-14,3.03080162 C2.93098879e-14,2.96457769 0.0295894161,2.90586853 0.0732690302,2.86218891 C1.92988747,1.02013034 4.60843413,-9.28146449e-14 7.20666667,-9.28146449e-14 C9.8048992,-9.28146449e-14 12.4829762,1.02013034 14.3400643,2.86218891 C14.3842136,2.9063382 14.4133333,2.96504736 14.4133333,3.03080162 C14.4133333,3.20692909 13.3490537,4.26369395 13.180441,4.26369395 Z" id="Shape"></path>
				                  <path d="M11.1913747,22.2675751 C11.1326655,22.2675751 11.0664416,22.2379857 11.022762,22.2088659 C9.8119443,21.2695194 8.79181396,20.7120172 7.20666667,20.7120172 C4.9902785,20.7120172 3.30227277,22.2680447 3.22195864,22.2680447 C3.05334593,22.2680447 1.99658107,21.2112799 1.99658107,21.0351524 C1.99658107,20.9764432 2.02617049,20.9177341 2.0698501,20.8735848 C3.38352624,19.5599087 5.36507777,18.8333241 7.20713634,18.8333241 C9.04919491,18.8333241 11.0307464,19.5599087 12.3444226,20.8735848 C12.3885719,20.9177341 12.4176916,20.9764432 12.4176916,21.0351524 C12.4176916,21.2112799 11.3609267,22.2680447 11.192314,22.2680447 L11.1913747,22.2675751 Z M13.180441,20.2785088 C13.1217318,20.2785088 13.0630227,20.2489194 13.0188734,20.2122848 C11.3238226,18.7224812 9.49632386,17.8935079 7.20666667,17.8935079 C4.91700947,17.8935079 3.08951078,18.7229509 1.39445994,20.2122848 C1.35031065,20.2489194 1.29160149,20.2785088 1.23289234,20.2785088 C1.06427963,20.2785088 0,19.2217439 0,19.0456164 C0,18.9793925 0.0295894161,18.9206833 0.0732690302,18.8770037 C1.92988747,17.0349452 4.60843413,16.0148148 7.20666667,16.0148148 C9.8048992,16.0148148 12.4829762,17.0349452 14.3400643,18.8770037 C14.3842136,18.921153 14.4133333,18.9798622 14.4133333,19.0456164 C14.4133333,19.2217439 13.3490537,20.2785088 13.180441,20.2785088 Z" id="Shape-Copy" transform="translate(7.206667, 19.141430) scale(1, -1) translate(-7.206667, -19.141430) "></path>
				                	<g id="hand" transform="translate(6.921778, 10.862119) rotate(-90.000000) translate(-6.921778, -10.862119) translate(1.921778, 5.862119)">
				          	      	<path d="M6.88111751,8.07684764 L8.0184256,6.54557511 L9.35406116,5.26951467 C9.35406116,5.26951467 8.90897742,4.73871964 8.35858027,4.73871964 C8.11143964,4.73871964 7.88505422,4.80944107 7.67827093,4.95088391 C7.47264071,5.0919424 7.2850752,5.30372231 7.11595876,5.58699236 C6.87958009,5.6696288 6.69547378,5.74842169 6.56325547,5.82337102 C6.53404444,5.52895467 6.49868373,5.31102507 6.45755769,5.16996658 L7.22473138,2.19197973 C7.40653156,1.47400356 7.44996373,1.11117191 7.01756373,0.918994133 C6.58516373,0.726816356 6.14315484,1.25684267 5.91561636,1.93253973 L5.18803129,4.23213902 L5.20993956,1.27490738 C5.20993956,0.548859733 4.98086364,0.186028089 4.52271182,0.186028089 C4.05994773,0.186028089 3.82895004,0.507733689 3.82895004,1.15076053 L3.82895004,4.10722347 L3.08483769,1.51743573 C2.90034702,1.05928391 2.57556658,0.608050489 2.14316658,0.752183822 C1.71076658,0.896317156 1.73113742,1.60775929 1.85105636,2.06322062 L2.51406969,4.58805227 L1.44479253,2.82193849 C1.11770596,2.25501404 0.553472,2.14547271 0.425865956,2.27769102 C0.222541867,2.48870222 0.08648,2.93762951 0.455461333,3.58219378 L1.63504853,5.63580551 L2.68818276,9.28410844 L2.68818276,9.99324444 L5.7630272,9.99324444 L5.7630272,9.07886258 C6.12009351,8.83402809 6.42873102,8.50002311 6.88111751,8.07684764 L6.88111751,8.07684764 L6.88111751,8.07684764 Z" id="Shape"></path>
				                	</g>
				              	</g>
				                  <g id="flash_on" transform="translate(0.000000, 3.333333)">
				                    <polygon id="Shape" fill="#F6F6F6" fillRule="nonzero" transform="translate(6.508410, 8.678724) rotate(25.000000) translate(-6.508410, -8.678724) " points="10.1356043 1.45796491 7.22039766 7.22112086 10.1356043 7.22112086 5.05080702 15.8994834 5.05080702 9.3907115 2.88121637 9.3907115 2.88121637 1.45796491"></polygon>
				                    <path d="M0.464912281,2.3245614 L12.5526316,13.4824561" id="Line" stroke="#F6F6F6" strokeLinecap="square"></path>
				                  </g>
				                  <path d="M180.102322,18.7953562 C180.598096,17.8038083 181.398159,17.7963181 181.897678,18.7953562 L184.102322,23.2046438 C184.598096,24.1961917 184.113294,25 183.001899,25 L178.998101,25 C177.89458,25 177.398159,24.2036819 177.897678,23.2046438 L180.102322,18.7953562 Z" id="Triangle" fill="#F8E81C"></path>
				            </g>
				            <g id="Overlay" transform="translate(27.333333, 25.333333)" stroke="#333333">
	                    <path d="M329.333333,0.666666667 L345.333333,0.666666667" id="Line" strokeWidth="4" strokeLinecap="square"></path>
	                    <path d="M1.33333333,0.666666667 L17.3333333,0.666666667" id="Line-Copy" strokeWidth="4" strokeLinecap="square"></path>
	                    <path d="M1.33333333,215.333333 L17.3333333,215.333333" id="Line-Copy-3" strokeWidth="4" strokeLinecap="square"></path>
	                    <path d="M329.333333,215.333333 L345.333333,215.333333" id="Line-Copy-5" strokeWidth="4" strokeLinecap="square"></path>
	                    <path d="M345.333333,0.666666667 L345.333333,16.6666667" id="Line" strokeWidth="4" strokeLinecap="square"></path>
	                    <path d="M1.33333333,0.666666667 L1.33333333,16.6666667" id="Line-Copy-2" strokeWidth="4" strokeLinecap="square"></path>
	                    <path d="M1.33333333,199.333333 L1.33333333,215.333333" id="Line-Copy-4" strokeWidth="4" strokeLinecap="square"></path>
	                    <path d="M345.333333,199.333333 L345.333333,215.333333" id="Line-Copy-6" strokeWidth="4" strokeLinecap="square"></path>
	                    <circle id="Combined-Shape" strokeWidth="2" cx="169.333333" cy="110" r="32"></circle>
	                    <path d="M54.3333333,162.666667 L70.3333333,162.666667" id="Line" strokeWidth="2" strokeLinecap="square"></path>
	                    <path d="M276.333333,162 L292.333333,162" id="Line-Copy-9" strokeWidth="2" strokeLinecap="square"></path>
	                    <path d="M276.333333,53.3333333 L292.333333,53.3333333" id="Line-Copy-11" strokeWidth="2" strokeLinecap="square"></path>
	                    <path d="M54.3333333,53.3333333 L70.3333333,53.3333333" id="Line-Copy-7" strokeWidth="2" strokeLinecap="square"></path>
	                    <path d="M54,146.666667 L54,162.666667" id="Line" strokeWidth="2" strokeLinecap="square"></path>
	                    <path d="M292.666667,146 L292.666667,162" id="Line-Copy-10" strokeWidth="2" strokeLinecap="square"></path>
	                    <path d="M292.666667,53.3333333 L292.666667,69.3333333" id="Line-Copy-12" strokeWidth="2" strokeLinecap="square"></path>
	                    <path d="M54,53.3333333 L54,69.3333333" id="Line-Copy-8" strokeWidth="2" strokeLinecap="square"></path>
				            </g>
				          </g>
				      </g>
				    </g>			    
					</svg>
				</div>	
			</div>
		)
	} 
}

export default Camera;