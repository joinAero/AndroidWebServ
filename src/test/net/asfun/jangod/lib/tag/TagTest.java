package net.asfun.jangod.lib.tag;

import java.util.HashMap;
import java.util.Map;

import net.asfun.jangod.base.Context;
import net.asfun.jangod.interpret.InterpretException;
import net.asfun.jangod.interpret.JangodInterpreter;
import net.asfun.jangod.lib.TagLibrary;
import net.asfun.jangod.parse.TokenParser;
import android.test.AndroidTestCase;
import android.util.Log;

public class TagTest extends AndroidTestCase {

    static final String TAG = "TagTest";

    JangodInterpreter interpreter;

    @Override
    protected void setUp() throws Exception {

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("var1", "app_name");
        data.put("var2", "bg");

        Context context = new Context();
        context.initBindings(data, Context.SCOPE_GLOBAL);

        interpreter = new JangodInterpreter(context);
    }

    public void testResStrTag() throws Exception {
        Log.e(TAG, "testResStrTag");
        TagLibrary.addTag(new ResStrTag());
        String script = "{% rstr var1 %} is {% rstr 'app_name' %}";
        assertEquals("WifiShare is WifiShare", eval(script));
    }

    public void testResColorTag() throws Exception {
        Log.e(TAG, "testResColorTag");
        TagLibrary.addTag(new ResColorTag());
        String script = "{% rcolor var2 %} or {% rcolor 'bg' %}";
        Log.e(TAG, eval(script));
        assertEquals("#fffffbde or #fffffbde", eval(script));
    }

    public void testUUIDTag() throws Exception {
        Log.e(TAG, "testUUIDTag");
        TagLibrary.addTag(new UUIDTag());
        String script = "{% uuid %} or {% uuid %}";
        Log.e(TAG, eval(script));
    }

    private String eval(String script) throws InterpretException {
        TokenParser parser = new TokenParser(script);
        try {
            return interpreter.render(parser);
        } catch (InterpretException e) {
            throw e;
        }
    }

    @Override
    protected void tearDown() throws Exception {
        interpreter = null;
    }

}
