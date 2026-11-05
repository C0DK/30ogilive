{
  description = "30ogi.live, fødselsdagsinvitation til Nina";

  outputs = _: {
    nixosModules.default = ./module.nix;
  };
}
