// eslint-disable-next-line
Number.prototype.toCurrency = function () {
    const formateador = new Intl.NumberFormat("ES-GT", {
      style: "currency",
      currency: "GTQ"
    });
    return formateador.format(this).replace(' ','').replace('GT','');
  };
  // eslint-disable-next-line
  String.prototype.toCurrency = function () {
    const formateador = new Intl.NumberFormat("ES-GT", {
      style: "currency",
      currency: "GTQ"
    });
    return formateador.format(this).replace(' ','').replace('GT','');
  };