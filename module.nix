{ ... }: {
  services.caddy.virtualHosts."30ogi.live" = {
    serverAliases = [ "www.30ogi.live" ];
    extraConfig = ''
      @www host www.30ogi.live
      redir @www https://30ogi.live{uri}
      header X-Robots-Tag "noindex, nofollow"
      root * ${./public}
      file_server
    '';
  };
}
