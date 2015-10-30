<?php

class CollectByUrl_plugin
{

    function __construct(&$pluginManager) {

        if (isset($_GET["url"]) && $this->validateUrl($_GET["url"])) {
            $this->collectByUrl($_GET["url"]);
        }

        $pluginManager->register('demo', $this, 'say_hello');
        
    }

    function say_hello() {
        echo "CollectByUrl_plugin enabled <br>";
    }

    /**
     * ��֤ url
     * @param  $url
     * @return bool
     */
    function validateUrl($url) {
        return true;
        // return preg_match('/^https?:\/\//', $url);
    }

    /**
     * �ռ�����
     * $url
     * @return voids
     */
    function collectByUrl($url) {
        var_dump($url);
        return;
        insertPage(addslashes(file_get_contents($url)));
    }

}

