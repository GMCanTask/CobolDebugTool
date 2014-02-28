import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class coboldebugtool extends HttpServlet
{
  public void doGet(HttpServletRequest paramHttpServletRequest, HttpServletResponse paramHttpServletResponse)
    throws IOException, ServletException
  {
	  StringBuffer localStringBuffer = paramHttpServletRequest.getRequestURL();

       String path = localStringBuffer.toString();
       path = path.replaceAll("http://172.27.52.74:8080/coboldebugtool","");

       String str1 = null;

    if(path.equals("/")){
      str1 = getServletContext().getRealPath("/WEB-INF/lib/json/debug/t.json");
    }else if(path.equals("/hrms")){
      str1 = getServletContext().getRealPath("/WEB-INF/lib/json/hrms/t.json");
    }else if(path.equals("/cjkwiki")){
      str1 = getServletContext().getRealPath("/WEB-INF/lib/json/cjkwiki/t.json");
    }else if(path.equals("/styles/main.css")){
      str1 = getServletContext().getRealPath("/WEB-INF/styles/main.css");
    }else if(path.equals("/scripts/fittext.js")){
      str1 = getServletContext().getRealPath("/WEB-INF/scripts/fittext.js");
    }else if(path.equals("/scripts/debug.js")){
      str1 = getServletContext().getRealPath("/WEB-INF/scripts/debug.js");
    }else if(path.equals("/scripts/hrms.js")){
      str1 = getServletContext().getRealPath("/WEB-INF/scripts/hrms.js");
    }else if(path.equals("/scripts/cjkwiki.js")){
      str1 = getServletContext().getRealPath("/WEB-INF/scripts/cjkwiki.js");
    }else if(path.equals("/scripts/avatar.js")){
      str1 = getServletContext().getRealPath("/WEB-INF/scripts/avatar.js");
    }else if(path.equals("/scripts/onlyc.js")){
        str1 = getServletContext().getRealPath("/WEB-INF/scripts/onlyc.js");
    }else{
      str1 = getServletContext().getRealPath("/WEB-INF/lib/json/error/t.json");
    }
    String str2 = str1;
    String str3 = null;
    File localFile = new File(str2);
    try {
      FileInputStream localFileInputStream = new FileInputStream(localFile);
      @SuppressWarnings("resource")
	InputStreamReader localObject = new InputStreamReader(localFileInputStream);
      BufferedReader localBufferedReader = new BufferedReader((Reader)localObject);
      str3 = localBufferedReader.readLine();
      localBufferedReader.close();
    } catch (Exception localException) {
      localException.printStackTrace();
    }

    paramHttpServletResponse.setContentType("text/html");
    PrintWriter localPrintWriter = paramHttpServletResponse.getWriter();

    @SuppressWarnings("unused")
	Object localObject = localStringBuffer.toString();
    localPrintWriter.println(str3);
  }
}