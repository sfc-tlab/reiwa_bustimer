class Location {

  getPosName = async () => {
    try {
      const pos = await this.getPos();
      const posName = this.checkPos(pos)
      return posName;
    } catch (e) {
      alert("GPSの取得に失敗しました。")
      console.error(e)
    }
  }

  getPos = () => {
    try {
      return new Promise(async (resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          alert("GPSが無効になっています。");
          reject(false);
        }
      });
    } catch (e) {
      reject(e);
    }
  }



  checkPos = (pos) => {
    console.log(this.pos)
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    if ((35.37 <= lat && lat < 35.4) 
        && (139.4 <= long && long < 139.44)) {
      this.pos = 'sfc';
    } else if ((35.327 <= lat && lat < 35.347) 
               && (139.43 <= lng && lng < 139.46)) {
      this.pos = 'tuji';
    } else {
      this.pos = 'sho';
    }
    console.log(this.pos)
  }
}

export default Location
