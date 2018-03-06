package com.alibaba.weex;

import android.net.Uri;
import android.support.annotation.NonNull;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.adapter.URIAdapter;

import java.util.List;

public class CustomURIAdapter implements URIAdapter {
    @NonNull
    @Override
    public Uri rewrite(WXSDKInstance instance, String type, Uri uri) {
        if (null == uri) {
            return null;
        }
        String url = uri.toString();

        System.out.println("原始URL      "+url);

        if (url.startsWith("http")) {
            return uri;
        }else {
            url = url.replace("../", "");
            url = url.replace("./", "");
            url = url.replace("file://assets/", "file:///android_asset/");

            System.out.println("改变后URL      "+url);
            return Uri.parse(url);
        }
    }


//    private Uri.Builder buildRelativeURI(Uri.Builder resultBuilder, Uri base, Uri uri) {
//
//        System.out.println("buildRelativeURI   "+uri.getPath());
//
//        if (uri.getAuthority() != null) {
//            return resultBuilder.scheme(base.getScheme());
//        } else {
//            resultBuilder
//                    .encodedAuthority(base.getEncodedAuthority())
//                    .scheme(base.getScheme())
//                    .path(null);
//            System.out.println(uri.getPath());
//
////            if (uri.getPath().startsWith("/")) {
////                //relative to root
////                resultBuilder.appendEncodedPath(uri.getEncodedPath().substring(1));
////            } else {
////                List<String> segments = base.getPathSegments();
////                //ignore last segment if not end with /
////                int ignoreLast = 1;
////                if (base.getPath().endsWith("/")) {
////                    ignoreLast = 0;
////                }
////                for (int i = 0, len = segments.size() - ignoreLast; i < len; i++) {
////                    resultBuilder.appendEncodedPath(segments.get(i));
////                }
////                resultBuilder.appendEncodedPath(uri.getEncodedPath());
////            }
//            return resultBuilder;
//        }
//    }


}
