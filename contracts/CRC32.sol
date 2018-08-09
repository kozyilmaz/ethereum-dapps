pragma solidity ^0.4.24;

/**
 * @title CRC32 Smart Contract
 * @dev Smart contract to calculate CRC32 checksum
 */
contract CRC32 {

  // IEEE 802.3 compliant CRC32 table
  uint32[256] crc32_ieee_tab;

  /**
   * @dev Constructor that fills the IEEE 802.3 compliant CRC32 table
   */
  constructor() public {

    // fill crc32 table
    crc32_ieee_tab[0] = 0x00000000;
    crc32_ieee_tab[1] = 0x77073096;
    crc32_ieee_tab[2] = 0xee0e612c;
    crc32_ieee_tab[3] = 0x990951ba;
    crc32_ieee_tab[4] = 0x076dc419;
    crc32_ieee_tab[5] = 0x706af48f;
    crc32_ieee_tab[6] = 0xe963a535;
    crc32_ieee_tab[7] = 0x9e6495a3;
    crc32_ieee_tab[8] = 0x0edb8832;
    crc32_ieee_tab[9] = 0x79dcb8a4;
    crc32_ieee_tab[10] = 0xe0d5e91e;
    crc32_ieee_tab[11] = 0x97d2d988;
    crc32_ieee_tab[12] = 0x09b64c2b;
    crc32_ieee_tab[13] = 0x7eb17cbd;
    crc32_ieee_tab[14] = 0xe7b82d07;
    crc32_ieee_tab[15] = 0x90bf1d91;
    crc32_ieee_tab[16] = 0x1db71064;
    crc32_ieee_tab[17] = 0x6ab020f2;
    crc32_ieee_tab[18] = 0xf3b97148;
    crc32_ieee_tab[19] = 0x84be41de;
    crc32_ieee_tab[20] = 0x1adad47d;
    crc32_ieee_tab[21] = 0x6ddde4eb;
    crc32_ieee_tab[22] = 0xf4d4b551;
    crc32_ieee_tab[23] = 0x83d385c7;
    crc32_ieee_tab[24] = 0x136c9856;
    crc32_ieee_tab[25] = 0x646ba8c0;
    crc32_ieee_tab[26] = 0xfd62f97a;
    crc32_ieee_tab[27] = 0x8a65c9ec;
    crc32_ieee_tab[28] = 0x14015c4f;
    crc32_ieee_tab[29] = 0x63066cd9;
    crc32_ieee_tab[30] = 0xfa0f3d63;
    crc32_ieee_tab[31] = 0x8d080df5;
    crc32_ieee_tab[32] = 0x3b6e20c8;
    crc32_ieee_tab[33] = 0x4c69105e;
    crc32_ieee_tab[34] = 0xd56041e4;
    crc32_ieee_tab[35] = 0xa2677172;
    crc32_ieee_tab[36] = 0x3c03e4d1;
    crc32_ieee_tab[37] = 0x4b04d447;
    crc32_ieee_tab[38] = 0xd20d85fd;
    crc32_ieee_tab[39] = 0xa50ab56b;
    crc32_ieee_tab[40] = 0x35b5a8fa;
    crc32_ieee_tab[41] = 0x42b2986c;
    crc32_ieee_tab[42] = 0xdbbbc9d6;
    crc32_ieee_tab[43] = 0xacbcf940;
    crc32_ieee_tab[44] = 0x32d86ce3;
    crc32_ieee_tab[45] = 0x45df5c75;
    crc32_ieee_tab[46] = 0xdcd60dcf;
    crc32_ieee_tab[47] = 0xabd13d59;
    crc32_ieee_tab[48] = 0x26d930ac;
    crc32_ieee_tab[49] = 0x51de003a;
    crc32_ieee_tab[50] = 0xc8d75180;
    crc32_ieee_tab[51] = 0xbfd06116;
    crc32_ieee_tab[52] = 0x21b4f4b5;
    crc32_ieee_tab[53] = 0x56b3c423;
    crc32_ieee_tab[54] = 0xcfba9599;
    crc32_ieee_tab[55] = 0xb8bda50f;
    crc32_ieee_tab[56] = 0x2802b89e;
    crc32_ieee_tab[57] = 0x5f058808;
    crc32_ieee_tab[58] = 0xc60cd9b2;
    crc32_ieee_tab[59] = 0xb10be924;
    crc32_ieee_tab[60] = 0x2f6f7c87;
    crc32_ieee_tab[61] = 0x58684c11;
    crc32_ieee_tab[62] = 0xc1611dab;
    crc32_ieee_tab[63] = 0xb6662d3d;
    crc32_ieee_tab[64] = 0x76dc4190;
    crc32_ieee_tab[65] = 0x01db7106;
    crc32_ieee_tab[66] = 0x98d220bc;
    crc32_ieee_tab[67] = 0xefd5102a;
    crc32_ieee_tab[68] = 0x71b18589;
    crc32_ieee_tab[69] = 0x06b6b51f;
    crc32_ieee_tab[70] = 0x9fbfe4a5;
    crc32_ieee_tab[71] = 0xe8b8d433;
    crc32_ieee_tab[72] = 0x7807c9a2;
    crc32_ieee_tab[73] = 0x0f00f934;
    crc32_ieee_tab[74] = 0x9609a88e;
    crc32_ieee_tab[75] = 0xe10e9818;
    crc32_ieee_tab[76] = 0x7f6a0dbb;
    crc32_ieee_tab[77] = 0x086d3d2d;
    crc32_ieee_tab[78] = 0x91646c97;
    crc32_ieee_tab[79] = 0xe6635c01;
    crc32_ieee_tab[80] = 0x6b6b51f4;
    crc32_ieee_tab[81] = 0x1c6c6162;
    crc32_ieee_tab[82] = 0x856530d8;
    crc32_ieee_tab[83] = 0xf262004e;
    crc32_ieee_tab[84] = 0x6c0695ed;
    crc32_ieee_tab[85] = 0x1b01a57b;
    crc32_ieee_tab[86] = 0x8208f4c1;
    crc32_ieee_tab[87] = 0xf50fc457;
    crc32_ieee_tab[88] = 0x65b0d9c6;
    crc32_ieee_tab[89] = 0x12b7e950;
    crc32_ieee_tab[90] = 0x8bbeb8ea;
    crc32_ieee_tab[91] = 0xfcb9887c;
    crc32_ieee_tab[92] = 0x62dd1ddf;
    crc32_ieee_tab[93] = 0x15da2d49;
    crc32_ieee_tab[94] = 0x8cd37cf3;
    crc32_ieee_tab[95] = 0xfbd44c65;
    crc32_ieee_tab[96] = 0x4db26158;
    crc32_ieee_tab[97] = 0x3ab551ce;
    crc32_ieee_tab[98] = 0xa3bc0074;
    crc32_ieee_tab[99] = 0xd4bb30e2;
    crc32_ieee_tab[100] = 0x4adfa541;
    crc32_ieee_tab[101] = 0x3dd895d7;
    crc32_ieee_tab[102] = 0xa4d1c46d;
    crc32_ieee_tab[103] = 0xd3d6f4fb;
    crc32_ieee_tab[104] = 0x4369e96a;
    crc32_ieee_tab[105] = 0x346ed9fc;
    crc32_ieee_tab[106] = 0xad678846;
    crc32_ieee_tab[107] = 0xda60b8d0;
    crc32_ieee_tab[108] = 0x44042d73;
    crc32_ieee_tab[109] = 0x33031de5;
    crc32_ieee_tab[110] = 0xaa0a4c5f;
    crc32_ieee_tab[111] = 0xdd0d7cc9;
    crc32_ieee_tab[112] = 0x5005713c;
    crc32_ieee_tab[113] = 0x270241aa;
    crc32_ieee_tab[114] = 0xbe0b1010;
    crc32_ieee_tab[115] = 0xc90c2086;
    crc32_ieee_tab[116] = 0x5768b525;
    crc32_ieee_tab[117] = 0x206f85b3;
    crc32_ieee_tab[118] = 0xb966d409;
    crc32_ieee_tab[119] = 0xce61e49f;
    crc32_ieee_tab[120] = 0x5edef90e;
    crc32_ieee_tab[121] = 0x29d9c998;
    crc32_ieee_tab[122] = 0xb0d09822;
    crc32_ieee_tab[123] = 0xc7d7a8b4;
    crc32_ieee_tab[124] = 0x59b33d17;
    crc32_ieee_tab[125] = 0x2eb40d81;
    crc32_ieee_tab[126] = 0xb7bd5c3b;
    crc32_ieee_tab[127] = 0xc0ba6cad;
    crc32_ieee_tab[128] = 0xedb88320;
    crc32_ieee_tab[129] = 0x9abfb3b6;
    crc32_ieee_tab[130] = 0x03b6e20c;
    crc32_ieee_tab[131] = 0x74b1d29a;
    crc32_ieee_tab[132] = 0xead54739;
    crc32_ieee_tab[133] = 0x9dd277af;
    crc32_ieee_tab[134] = 0x04db2615;
    crc32_ieee_tab[135] = 0x73dc1683;
    crc32_ieee_tab[136] = 0xe3630b12;
    crc32_ieee_tab[137] = 0x94643b84;
    crc32_ieee_tab[138] = 0x0d6d6a3e;
    crc32_ieee_tab[139] = 0x7a6a5aa8;
    crc32_ieee_tab[140] = 0xe40ecf0b;
    crc32_ieee_tab[141] = 0x9309ff9d;
    crc32_ieee_tab[142] = 0x0a00ae27;
    crc32_ieee_tab[143] = 0x7d079eb1;
    crc32_ieee_tab[144] = 0xf00f9344;
    crc32_ieee_tab[145] = 0x8708a3d2;
    crc32_ieee_tab[146] = 0x1e01f268;
    crc32_ieee_tab[147] = 0x6906c2fe;
    crc32_ieee_tab[148] = 0xf762575d;
    crc32_ieee_tab[149] = 0x806567cb;
    crc32_ieee_tab[150] = 0x196c3671;
    crc32_ieee_tab[151] = 0x6e6b06e7;
    crc32_ieee_tab[152] = 0xfed41b76;
    crc32_ieee_tab[153] = 0x89d32be0;
    crc32_ieee_tab[154] = 0x10da7a5a;
    crc32_ieee_tab[155] = 0x67dd4acc;
    crc32_ieee_tab[156] = 0xf9b9df6f;
    crc32_ieee_tab[157] = 0x8ebeeff9;
    crc32_ieee_tab[158] = 0x17b7be43;
    crc32_ieee_tab[159] = 0x60b08ed5;
    crc32_ieee_tab[160] = 0xd6d6a3e8;
    crc32_ieee_tab[161] = 0xa1d1937e;
    crc32_ieee_tab[162] = 0x38d8c2c4;
    crc32_ieee_tab[163] = 0x4fdff252;
    crc32_ieee_tab[164] = 0xd1bb67f1;
    crc32_ieee_tab[165] = 0xa6bc5767;
    crc32_ieee_tab[166] = 0x3fb506dd;
    crc32_ieee_tab[167] = 0x48b2364b;
    crc32_ieee_tab[168] = 0xd80d2bda;
    crc32_ieee_tab[169] = 0xaf0a1b4c;
    crc32_ieee_tab[170] = 0x36034af6;
    crc32_ieee_tab[171] = 0x41047a60;
    crc32_ieee_tab[172] = 0xdf60efc3;
    crc32_ieee_tab[173] = 0xa867df55;
    crc32_ieee_tab[174] = 0x316e8eef;
    crc32_ieee_tab[175] = 0x4669be79;
    crc32_ieee_tab[176] = 0xcb61b38c;
    crc32_ieee_tab[177] = 0xbc66831a;
    crc32_ieee_tab[178] = 0x256fd2a0;
    crc32_ieee_tab[179] = 0x5268e236;
    crc32_ieee_tab[180] = 0xcc0c7795;
    crc32_ieee_tab[181] = 0xbb0b4703;
    crc32_ieee_tab[182] = 0x220216b9;
    crc32_ieee_tab[183] = 0x5505262f;
    crc32_ieee_tab[184] = 0xc5ba3bbe;
    crc32_ieee_tab[185] = 0xb2bd0b28;
    crc32_ieee_tab[186] = 0x2bb45a92;
    crc32_ieee_tab[187] = 0x5cb36a04;
    crc32_ieee_tab[188] = 0xc2d7ffa7;
    crc32_ieee_tab[189] = 0xb5d0cf31;
    crc32_ieee_tab[190] = 0x2cd99e8b;
    crc32_ieee_tab[191] = 0x5bdeae1d;
    crc32_ieee_tab[192] = 0x9b64c2b0;
    crc32_ieee_tab[193] = 0xec63f226;
    crc32_ieee_tab[194] = 0x756aa39c;
    crc32_ieee_tab[195] = 0x026d930a;
    crc32_ieee_tab[196] = 0x9c0906a9;
    crc32_ieee_tab[197] = 0xeb0e363f;
    crc32_ieee_tab[198] = 0x72076785;
    crc32_ieee_tab[199] = 0x05005713;
    crc32_ieee_tab[200] = 0x95bf4a82;
    crc32_ieee_tab[201] = 0xe2b87a14;
    crc32_ieee_tab[202] = 0x7bb12bae;
    crc32_ieee_tab[203] = 0x0cb61b38;
    crc32_ieee_tab[204] = 0x92d28e9b;
    crc32_ieee_tab[205] = 0xe5d5be0d;
    crc32_ieee_tab[206] = 0x7cdcefb7;
    crc32_ieee_tab[207] = 0x0bdbdf21;
    crc32_ieee_tab[208] = 0x86d3d2d4;
    crc32_ieee_tab[209] = 0xf1d4e242;
    crc32_ieee_tab[210] = 0x68ddb3f8;
    crc32_ieee_tab[211] = 0x1fda836e;
    crc32_ieee_tab[212] = 0x81be16cd;
    crc32_ieee_tab[213] = 0xf6b9265b;
    crc32_ieee_tab[214] = 0x6fb077e1;
    crc32_ieee_tab[215] = 0x18b74777;
    crc32_ieee_tab[216] = 0x88085ae6;
    crc32_ieee_tab[217] = 0xff0f6a70;
    crc32_ieee_tab[218] = 0x66063bca;
    crc32_ieee_tab[219] = 0x11010b5c;
    crc32_ieee_tab[220] = 0x8f659eff;
    crc32_ieee_tab[221] = 0xf862ae69;
    crc32_ieee_tab[222] = 0x616bffd3;
    crc32_ieee_tab[223] = 0x166ccf45;
    crc32_ieee_tab[224] = 0xa00ae278;
    crc32_ieee_tab[225] = 0xd70dd2ee;
    crc32_ieee_tab[226] = 0x4e048354;
    crc32_ieee_tab[227] = 0x3903b3c2;
    crc32_ieee_tab[228] = 0xa7672661;
    crc32_ieee_tab[229] = 0xd06016f7;
    crc32_ieee_tab[230] = 0x4969474d;
    crc32_ieee_tab[231] = 0x3e6e77db;
    crc32_ieee_tab[232] = 0xaed16a4a;
    crc32_ieee_tab[233] = 0xd9d65adc;
    crc32_ieee_tab[234] = 0x40df0b66;
    crc32_ieee_tab[235] = 0x37d83bf0;
    crc32_ieee_tab[236] = 0xa9bcae53;
    crc32_ieee_tab[237] = 0xdebb9ec5;
    crc32_ieee_tab[238] = 0x47b2cf7f;
    crc32_ieee_tab[239] = 0x30b5ffe9;
    crc32_ieee_tab[240] = 0xbdbdf21c;
    crc32_ieee_tab[241] = 0xcabac28a;
    crc32_ieee_tab[242] = 0x53b39330;
    crc32_ieee_tab[243] = 0x24b4a3a6;
    crc32_ieee_tab[244] = 0xbad03605;
    crc32_ieee_tab[245] = 0xcdd70693;
    crc32_ieee_tab[246] = 0x54de5729;
    crc32_ieee_tab[247] = 0x23d967bf;
    crc32_ieee_tab[248] = 0xb3667a2e;
    crc32_ieee_tab[249] = 0xc4614ab8;
    crc32_ieee_tab[250] = 0x5d681b02;
    crc32_ieee_tab[251] = 0x2a6f2b94;
    crc32_ieee_tab[252] = 0xb40bbe37;
    crc32_ieee_tab[253] = 0xc30c8ea1;
    crc32_ieee_tab[254] = 0x5a05df1b;
    crc32_ieee_tab[255] = 0x2d02ef8d;
  }

  /**
   * @dev Function to calculate CRC32
   * @param _buffer The data buffer to be checksummed
   * @param _size The size of the data buffer
   * @return A boolean that indicates if the operation was successful.
   */
  function crc32(bytes _buffer, uint _size) public view returns (uint32) {
    require(_size > 0);
    require(_buffer.length > 0);
    require(_buffer.length >= _size);

    uint i = 0;
    uint32 crc = 0xffffffff;

    while (_size-- > 0) {
      crc = crc32_ieee_tab[uint8(crc & 0x000000ff) ^ uint8(_buffer[i++])] ^ (crc >> 8);
    }
    return (crc ^ 0xffffffff);
  }
}
