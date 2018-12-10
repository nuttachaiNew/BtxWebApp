package com.spt.app.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.Base64;
import java.util.Map;

public class SerializeUtil {

	   /** Read the object from Base64 string. */
	   public static Object fromString( String s ) throws IOException ,
	                                                       ClassNotFoundException {
	        byte [] data = Base64.getDecoder().decode( s );
	        ObjectInputStream ois = new ObjectInputStream( 
	                                        new ByteArrayInputStream(  data ) );
	        Object o  = ois.readObject();
	        ois.close();
	        return o;
	   }

	   /** Write the object to a Base64 string. */
	   public static String toString( Serializable o ) throws IOException {
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        ObjectOutputStream oos = new ObjectOutputStream( baos );
	        oos.writeObject( o );
	        oos.close();
	        return Base64.getEncoder().encodeToString(baos.toByteArray()); 
	   }
	   
	   public static byte[] mapToStream(Map map) throws IOException{
		   ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
		    ObjectOutputStream out = new ObjectOutputStream(byteOut);
		    out.writeObject(map);
		    out.close();
			return Base64.getEncoder().encode(byteOut.toByteArray());
	   }
	   
	   public static Map streamToMap(byte[] stream) throws IOException, ClassNotFoundException{
		   ByteArrayInputStream byteIn = new ByteArrayInputStream(Base64.getDecoder().decode(stream));
		    ObjectInputStream in = new ObjectInputStream(byteIn);
		    Map map = (Map) in.readObject();
		    in.close();
		    return map;
	   }
	   
	   
	
}
